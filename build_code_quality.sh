#!/bin/bash

# Sonar gives a weird version error if we don't help it know where Java is.
export JAVA_HOME=${JAVA_HOME_ORACLEJDK8}
export PATH=${JAVA_HOME}/bin:${PATH}

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

function installBowerPackages {
    echo --------------------------------------------------
    echo Running bower install...

    echo Bower version:
    bower --version

    cd public
    bower install || die bower install failed
    cd ..

    echo Done running bower install
}

function generateCoverageReport {
    echo -----------------------CREATING COVERAGE REPORT---------------------------

    cd public
    $(npm bin)/karma start karma.conf.js --single-run || die coverage report generation failed
    cd ..
    echo Done generating coverage report
}

installNodePackages
installBowerPackages
generateCoverageReport

# Jenkins gives a permission error if we do not grant execute permission first. Not sure why this is necessary as it
# does not appear to be done in other app/service build scripts.
chmod +x bin/sonar-scanner-2.8/bin/sonar-scanner

# The Sonar documentation said this should be stored in and executed from our repo. Ideally, we would not be storing
# the binaries. REF: https://devcloud.swcoe.ge.com/devspace/x/MBJpQw
./bin/sonar-scanner-2.8/bin/sonar-scanner

echo Sonar Scanner has run