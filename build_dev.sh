#!/bin/bash

# Setup proxies
export http_proxy=http://sjc1intproxy01.crd.ge.com:8080/
export https_proxy=http://sjc1intproxy01.crd.ge.com:8080/
export no_proxy=github.build.ge.com,localhost,127.0.0.1

# Setup all the variables
appName=ss-maintenance-microapp
appVersion=2.7.0

configOnly=false
buildOnly=false
ignoreProxy=false

# Where are we running from?
SCRIPT_ROOT="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Destination directory for our artifacts
BUILD_DIR=$SCRIPT_ROOT/builds

# Backup directory for our previous artifacts.
BUILD_DIR_PREV="${BUILD_DIR}/previous"

# Destination directory for our QA test artifact.
BUILD_DIR_QA="${BUILD_DIR}/qa"

# Add some styleesc=`echo -en "\033"`
cc_red="${esc}[0;31m"
cc_green="${esc}[0;32m"
cc_bold="${esc}[1m"
cc_normal=`echo -en "${esc}[m\017"`

function buildFailed {
    echo
    echo !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    echo !!!!!!!!!!!!!!!  ${cc_red}$@ BUILD FAILED${cc_normal} !!!!!!!!!!!!!!!
    echo !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    echo
}

function die {
    buildFailed $@
    exit 1
}

function printEnvironmentVariables {
    echo --------------------------------------------------
    echo --------------------------------------------------
    echo Presenting the variables of the environment!
    printenv
    echo --------------------------------------------------
    echo --------------------------------------------------
}

function installNodePackages {
    echo --------------------------------------------------
    echo Running npm install...

    echo Node version:
    node --version

    echo NPM version:
    npm --version

    npm install || die npm install failed

    echo Done running npm install
}

function compileTypeScriptFiles {
    echo --------------------------------------------------
    echo Compiling TypeScript files

    echo TypeScript version:
    $(npm bin)/tsc --version

    echo Compile all the TypeScript things
    $(npm bin)/tsc --listEmittedFiles --project . || die typescript compile failed

    echo Done compiling TypeScript files
}

function doWebpackStuff {
    echo -------------------WEBPACK-------------------------------
     echo shorter webpack
     cd public
     $(npm bin)/webpack -p --progress --watch || die webpack bundling failed
     cd ..
}


compileTypeScriptFiles
doWebpackStuff


echo It\'s the end of the script as we know it...and I feel fine
