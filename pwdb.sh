#!/bin/bash

# Configuration
DEBUG=${DEBUG:-false}

echo "🎭 Starting Playwright Debug with auto-arrangement..."

# Start Playwright in background
npx playwright test "$@" --debug &
PLAYWRIGHT_PID=$!
echo "🚀 Playwright started with PID: $PLAYWRIGHT_PID"

sleep 3
[[ "$DEBUG" == "true" ]] && echo "🔍 Starting greedy window detection..."

# Greedy algorithm - keep found windows
BROWSER_FOUND=false
INSPECTOR_FOUND=false

for i in {1..30}; do
    [[ "$DEBUG" == "true" ]] && echo "🔄 Attempt $i/30 (Browser: $BROWSER_FOUND, Inspector: $INSPECTOR_FOUND)..."
    
    if [[ "$BROWSER_FOUND" == "false" || "$INSPECTOR_FOUND" == "false" ]]; then
        if [[ "$DEBUG" == "true" ]]; then
            # Check what windows we have
            WINDOW_INFO=$(osascript -e '
            tell application "System Events"
                set windowList to {}
                repeat with proc in (application processes whose name contains "Chromium")
                    repeat with win in windows of proc
                        set end of windowList to (title of win)
                    end repeat
                end repeat
                return windowList
            end tell')
            echo "🪟 Current windows: $WINDOW_INFO"
        fi
        
        # Look for missing windows only
        if [[ "$BROWSER_FOUND" == "false" ]]; then
            BROWSER_CHECK=$(osascript -e '
            tell application "System Events"
                repeat with proc in (application processes whose name contains "Chromium")
                    repeat with win in windows of proc
                        set winTitle to title of win
                        if winTitle contains "about:blank" and winTitle contains "Chromium" then
                            return "FOUND"
                        end if
                    end repeat
                end repeat
                return "NOT_FOUND"
            end tell')
            
            if [[ "$BROWSER_CHECK" == "FOUND" ]]; then
                BROWSER_FOUND=true
                [[ "$DEBUG" == "true" ]] && echo "✅ Browser window found and locked!"
            fi
        fi
        
        if [[ "$INSPECTOR_FOUND" == "false" ]]; then
            INSPECTOR_CHECK=$(osascript -e '
            tell application "System Events"
                repeat with proc in (application processes whose name contains "Chromium")
                    repeat with win in windows of proc
                        set winTitle to title of win
                        if winTitle contains "Playwright Inspector" then
                            return "FOUND"
                        end if
                    end repeat
                end repeat
                return "NOT_FOUND"
            end tell')
            
            if [[ "$INSPECTOR_CHECK" == "FOUND" ]]; then
                INSPECTOR_FOUND=true
                [[ "$DEBUG" == "true" ]] && echo "✅ Inspector window found and locked!"
            fi
        fi
    fi
    
    # If both windows are found, arrange them
    if [[ "$BROWSER_FOUND" == "true" && "$INSPECTOR_FOUND" == "true" ]]; then
        echo "🎉 Both windows found! Arranging..."
        
        RESULT=$(osascript -e '
        tell application "System Events"
            set browserWindow to missing value
            set inspectorWindow to missing value
            set browserApp to missing value
            set inspectorApp to missing value
            
            repeat with proc in (application processes whose name contains "Chromium")
                repeat with win in windows of proc
                    set winTitle to title of win
                    if winTitle contains "about:blank" and winTitle contains "Chromium" and browserWindow is missing value then
                        set browserWindow to win
                        set browserApp to proc
                    else if winTitle contains "Playwright Inspector" and inspectorWindow is missing value then
                        set inspectorWindow to win
                        set inspectorApp to proc
                    end if
                end repeat
            end repeat
            
            if browserWindow is not missing value and inspectorWindow is not missing value then
                try
                    -- Method 1: Direct bounds setting with app focus
                    set frontmost of browserApp to true
                    delay 0.2
                    set bounds of browserWindow to {0, 0, 960, 1080}
                    
                    set frontmost of inspectorApp to true
                    delay 0.2
                    set bounds of inspectorWindow to {960, 0, 1920, 1080}
                    
                    return "SUCCESS"
                on error errorMessage1
                    try
                        -- Method 2: Using window properties
                        tell browserWindow
                            set position to {0, 0}
                            set size to {960, 1080}
                        end tell
                        
                        tell inspectorWindow
                            set position to {960, 0}
                            set size to {960, 1080}
                        end tell
                        
                        return "SUCCESS_METHOD2"
                    on error errorMessage2
                        try
                            -- Method 3: Using AXPosition and AXSize attributes
                            set value of attribute "AXPosition" of browserWindow to {0, 0}
                            set value of attribute "AXSize" of browserWindow to {960, 1080}
                            
                            set value of attribute "AXPosition" of inspectorWindow to {960, 0}
                            set value of attribute "AXSize" of inspectorWindow to {960, 1080}
                            
                            return "SUCCESS_METHOD3"
                        on error errorMessage3
                            return "ERROR_ALL_METHODS: " & errorMessage1 & " | " & errorMessage2 & " | " & errorMessage3
                        end try
                    end try
                end try
            else
                return "WINDOWS_MISSING"
            end if
        end tell' 2>&1)
        
        echo "📋 Arrangement result: $RESULT"
        
        if [[ "$RESULT" == "SUCCESS"* ]]; then
            echo "✅ Windows arranged successfully!"
            break
        else
            echo "❌ Failed to arrange: $RESULT"
            echo "🔄 Trying alternative method..."
            
            # Alternative method using Rectangle or system shortcuts
            FALLBACK_RESULT=$(osascript -e '
            tell application "System Events"
                -- Try to use keyboard shortcuts if available
                repeat with proc in (application processes whose name contains "Chromium")
                    repeat with win in windows of proc
                        set winTitle to title of win
                        if winTitle contains "about:blank" and winTitle contains "Chromium" then
                            set frontmost of proc to true
                            delay 0.1
                            -- Try Control+Option+Left for left half (if Rectangle is installed)
                            key code 123 using {control down, option down}
                            delay 0.3
                            exit repeat
                        end if
                    end repeat
                end repeat
                
                repeat with proc in (application processes whose name contains "Chromium")
                    repeat with win in windows of proc
                        set winTitle to title of win
                        if winTitle contains "Playwright Inspector" then
                            set frontmost of proc to true
                            delay 0.1
                            -- Try Control+Option+Right for right half
                            key code 124 using {control down, option down}
                            delay 0.3
                            exit repeat
                        end if
                    end repeat
                end repeat
                
                return "FALLBACK_ATTEMPTED"
            end tell')
            
            echo "🔧 Fallback result: $FALLBACK_RESULT"
            break
        fi
    fi
    
    sleep 0.5
done

if [[ "$BROWSER_FOUND" == "false" || "$INSPECTOR_FOUND" == "false" ]]; then
    echo "⏰ Timeout - Final status: Browser: $BROWSER_FOUND, Inspector: $INSPECTOR_FOUND"
fi

echo "⏳ Waiting for Playwright to finish..."
wait $PLAYWRIGHT_PID
echo "🏁 Done!"
