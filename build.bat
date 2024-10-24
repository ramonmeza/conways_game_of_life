:: setup devenv
call "C:\Program Files (x86)\Microsoft Visual Studio\2019\BuildTools\VC\Auxiliary\Build\vcvars64.bat"
setlocal enabledelayedexpansion

:: paths
set EXE_PATH=".\bin\output.exe"

set SRC_DIR=".\src"
set INCLUDE_DIR=".\include"
set OBJ_DIR=".\obj"

set GLFW_LIB=D:\code\lib\glfw-3.4\lib
set GLFW_INCL=D:\code\lib\glfw-3.4\include
set GLFW_DEP=glfw3dll.lib

set SPDLOG_LIB=D:\code\lib\spdlog-1.14.1\lib
set SPDLOG_INCL= D:\code\lib\spdlog-1.14.1\include
set SPDLOG_DEP=spdlogd.lib

:: get all C/C++ files from source/include directories
set "SRC_FILES="
for /R %SRC_DIR% %%f in (*.c *.cpp) do (
    if "!SRC_FILES!"=="" (
        set "SRC_FILES=%%f"
    ) else (
        set "SRC_FILES=!SRC_FILES! %%f"
    )
)
for /R %INCLUDE_DIR% %%f in (*.c *.cpp) do (
    if "!SRC_FILES!"=="" (
        set "SRC_FILES=%%f"
    ) else (
        set "SRC_FILES=!SRC_FILES! %%f"
    )
)

:: compile
echo cl /favor:AMD64 /Fe%EXE_PATH% /EHsc /std:c++17 /I%INCLUDE_DIR% /I%GLFW_INCL% /I%SPDLOG_INCL% !SRC_FILES! /link /LIBPATH:%GLFW_LIB% %GLFW_DEP% /LIBPATH:%SPDLOG_LIB% %SPDLOG_DEP%
cl /favor:AMD64 /Fe%EXE_PATH% /EHsc /std:c++17 /I%INCLUDE_DIR% /I%GLFW_INCL% /I%SPDLOG_INCL% !SRC_FILES! /link /LIBPATH:%GLFW_LIB% %GLFW_DEP% /LIBPATH:%SPDLOG_LIB% %SPDLOG_DEP%

move *.obj %OBJ_DIR%

endlocal