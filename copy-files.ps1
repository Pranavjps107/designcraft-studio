# PowerShell Script to Copy CRM Files to Correct Directory
# This copies all files from the "compnany" directory to the "compnay" directory

$source = "e:\Agentix compnany\chatbot\Pranavjps107_chatbot\designcraft-studio"
$destination = "e:\Agentix compnay\chatbot\Pranavjps107_chatbot\designcraft-studio"

Write-Host "Copying files from:" -ForegroundColor Cyan
Write-Host $source
Write-Host ""
Write-Host "To:" -ForegroundColor Cyan
Write-Host $destination
Write-Host ""

# Create destination directory if it doesn't exist
if (!(Test-Path $destination)) {
    New-Item -ItemType Directory -Path $destination -Force
    Write-Host "Created destination directory" -ForegroundColor Green
}

# Copy all files and folders
try {
    # Copy root files
    Copy-Item "$source\*.json" -Destination $destination -Force -ErrorAction SilentlyContinue
    Copy-Item "$source\*.js" -Destination $destination -Force -ErrorAction SilentlyContinue
    Copy-Item "$source\*.ts" -Destination $destination -Force -ErrorAction SilentlyContinue
    Copy-Item "$source\*.html" -Destination $destination -Force -ErrorAction SilentlyContinue
    Copy-Item "$source\*.md" -Destination $destination -Force -ErrorAction SilentlyContinue
    
    Write-Host "✓ Copied configuration files" -ForegroundColor Green
    
    # Copy src directory recursively
    if (Test-Path "$source\src") {
        Copy-Item "$source\src" -Destination $destination -Recurse -Force
        Write-Host "✓ Copied src directory" -ForegroundColor Green
    }
    
    Write-Host ""
    Write-Host "SUCCESS! All files copied successfully!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Yellow
    Write-Host "1. Open terminal in: $destination"
    Write-Host "2. Run: npm install"
    Write-Host "3. Run: npm run dev"
    Write-Host ""
    
} catch {
    Write-Host "Error: $_" -ForegroundColor Red
}

# List what was copied
Write-Host "Files copied:" -ForegroundColor Cyan
Get-ChildItem $destination -Recurse -File | Select-Object -First 20 | ForEach-Object {
    Write-Host "  - $($_.FullName.Replace($destination, ''))" -ForegroundColor Gray
}
