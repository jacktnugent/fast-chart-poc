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

function setEnvironmentVariables {
    echo -------------------------------------------------
    echo Setting Environment Variables

    case "$1" in
        dev)
            source ./env/.env.local.dev || die could not set environment variables
            ;;

        qa)
            source ./env/.env.local.qa || die could not set environment variables
            ;;

        local)
            source ./env/.env.local.local || die could not set environment variables
            ;;
        *)
            source ./env/.env.local.dev || die could not set environment variables
    esac
}

function startServer {
    npm start  || die could not start local server
}

setEnvironmentVariables
startServer