@echo off
chcp 65001 >nul
setlocal
rem ===================================================================
rem  Dua ban moi nhat cua app len GitHub Pages.
rem  Bam dup chuot vao file nay la xong. Khoang 10-20 giay.
rem  Link: https://sinhim.github.io/Vocabulary/english-vocab-4skills/
rem ===================================================================

set "PROJ=C:\Agent_company\app-tu-vung-con"
set "CLONE=C:\Agent_company\.github-Vocabulary"
set "SUB=english-vocab-4skills"
set "CRED=credential.helper=!gh auth git-credential"

echo.
echo === 1/5 Kiem tra bo tu truoc khi dua len ===
set "VSCODE=C:\Users\Admin\AppData\Local\Programs\Microsoft VS Code\Code.exe"
if exist "%VSCODE%" (
  set ELECTRON_RUN_AS_NODE=1
  "%VSCODE%" "%PROJ%\kiem-tra-tu-vung.js"
  if errorlevel 1 (
    echo.
    echo *** BO TU CO LOI - da dung lai, chua dua len. Xem bao loi o tren. ***
    pause
    exit /b 1
  )
  set ELECTRON_RUN_AS_NODE=
) else (
  echo Bo qua buoc kiem tra - khong tim thay VS Code.
)

echo.
echo === 2/5 Lay ban moi nhat tu GitHub ===
if not exist "%CLONE%\.git" (
  gh repo clone SinhIM/Vocabulary "%CLONE%"
  if errorlevel 1 goto loi
) else (
  git -C "%CLONE%" -c "%CRED%" pull --ff-only
  if errorlevel 1 goto loi
)

echo.
echo === 3/5 Copy file tu thu muc lam viec ===
if not exist "%CLONE%\%SUB%" mkdir "%CLONE%\%SUB%"
copy /y "%PROJ%\index.html"           "%CLONE%\%SUB%\" >nul
copy /y "%PROJ%\README.md"            "%CLONE%\%SUB%\" >nul
copy /y "%PROJ%\HUONG-DAN.md"         "%CLONE%\%SUB%\" >nul
copy /y "%PROJ%\kiem-tra-tu-vung.js"  "%CLONE%\%SUB%\" >nul
copy /y "%PROJ%\LICENSE"              "%CLONE%\%SUB%\" >nul
copy /y "%PROJ%\dua-len-github.cmd"   "%CLONE%\%SUB%\" >nul

echo.
echo === 4/5 Ghi lai thay doi ===
git -C "%CLONE%" add -A
git -C "%CLONE%" diff --cached --quiet
if not errorlevel 1 (
  echo Khong co gi thay doi so voi ban tren GitHub. Khong can dua len.
  pause
  exit /b 0
)
git -C "%CLONE%" commit -m "Cap nhat So Tu Moi Ngay (%DATE% %TIME%)"
if errorlevel 1 goto loi

echo.
echo === 5/5 Dua len GitHub ===
git -C "%CLONE%" -c "%CRED%" push origin main
if errorlevel 1 goto loi

echo.
echo ============================================================
echo  XONG. Doi khoang 1 phut roi mo lai link tren dien thoai:
echo  https://sinhim.github.io/Vocabulary/english-vocab-4skills/
echo  Neu dien thoai van hien ban cu: tai lai trang, hoac xoa
echo  cache trang do. Tien do hoc cua con KHONG bi mat.
echo ============================================================
pause
exit /b 0

:loi
echo.
echo *** CO LOI - chua dua len duoc. ***
echo Thu chay lenh nay trong Terminal roi gui ket qua cho Claude:
echo   gh auth status
pause
exit /b 1
