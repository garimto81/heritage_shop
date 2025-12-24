# GGP Heritage Mall - Environment Switcher
# Usage: .\scripts\switch-env.ps1 -Environment local|cloud

param(
    [Parameter(Mandatory=$true)]
    [ValidateSet("local", "cloud")]
    [string]$Environment
)

$projectRoot = "D:\AI\claude01\ggp_heritage_mall"
$envFile = "$projectRoot\.env.local"

if ($Environment -eq "local") {
    # Local Docker Supabase
    $content = @"
# ===========================================
# GGP Heritage Mall - Local Environment
# ===========================================

# Local Supabase (Docker)
NEXT_PUBLIC_SUPABASE_URL=http://127.0.0.1:54321

# New Key System (from supabase start)
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_ACJWlzQHlZjBrEguHvfOxg_3BJgxAaH
SUPABASE_SECRET_KEY=sb_secret_N7UND0UgjKTVK-Uodkm0Hg_xSvEMPvz

# Application Settings
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Email (Inbucket for local testing)
# Access: http://127.0.0.1:54324
RESEND_API_KEY=re_local_testing
"@
    Write-Host ""
    Write-Host "=== Switched to LOCAL environment ===" -ForegroundColor Green
    Write-Host ""
    Write-Host "Local Supabase URLs:" -ForegroundColor Cyan
    Write-Host "  API:      http://127.0.0.1:54321"
    Write-Host "  Studio:   http://127.0.0.1:54323"
    Write-Host "  Inbucket: http://127.0.0.1:54324"
    Write-Host ""
    Write-Host "Commands:" -ForegroundColor Yellow
    Write-Host "  supabase start    # Start local Supabase"
    Write-Host "  supabase db reset # Apply migrations + seed"
    Write-Host ""
} else {
    # Cloud Supabase
    $content = @"
# ===========================================
# GGP Heritage Mall - Cloud Environment
# ===========================================

# Cloud Supabase
NEXT_PUBLIC_SUPABASE_URL=https://lhgjkbngqmysxnhqwcoc.supabase.co

# New Key System (2025+)
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_7dPQteaE96ql2PltLXEXmA_Fip8BGzO
SUPABASE_SECRET_KEY=sb_secret_jRzktib6Bm0lRIp0gAQ6bg_Dp4jsoOF

# Application Settings
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Email Service
RESEND_API_KEY=re_...
"@
    Write-Host ""
    Write-Host "=== Switched to CLOUD environment ===" -ForegroundColor Green
    Write-Host ""
    Write-Host "Cloud Supabase:" -ForegroundColor Cyan
    Write-Host "  Dashboard: https://supabase.com/dashboard/project/lhgjkbngqmysxnhqwcoc"
    Write-Host ""
}

Set-Content -Path $envFile -Value $content -Encoding UTF8
Write-Host "Updated: $envFile" -ForegroundColor Gray
Write-Host ""
