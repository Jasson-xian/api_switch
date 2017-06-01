#! /bin/sh

function throw_error() {
    exit 1
}

BUILD_START=$(date +%s)

echo "Start Build By: `whoami`"

ROOT=$PWD

cd $WWW_ROOT_DIR
git reset --hard || throw_error
git clean -xdf || throw_error
git pull || throw_error
cd $ROOT

# 1. check

if [ ! -d ../Switch ]; then
    echo "../Switch not exist!"
    throw_error
fi

if [ ! -d ../switch-web ]; then
    echo "../switch-web not exist!"
    throw_error
fi

if [ `basename $PWD` = switch-web ]; then
    if [ ! -d ../switch-web/node_modules ]; then
        echo "node_modules extra start ...."
        tar -xf $NODE_MODULES_PATH  || throw_error
        echo "node_modules extra finish"
    fi
    npm run build
elif [ `basename $PWD` = Switch ]; then
    if [ ! -f $WWW_ROOT_DIR/www_root.zip ]; then
        echo "错误！"
        throw_error
    fi

    rm -rf /tmp/www_root
    unzip -q $WWW_ROOT_DIR/www_root.zip -d /tmp || throw_error
    mv -f /tmp/www_root/static .
    mv -f /tmp/www_root/index.html .
fi

# 2.info
USER=$(git log --pretty=format:"%cn"|head -1)
MESSAGE=$(git log --pretty=format:"%s"|head -1)
URL=$(git remote -v |head -1)

# 3. work
rm -rf /tmp/www_root
cp -rf ../Switch /tmp/www_root || throw_error

rm -rf /tmp/www_root/.gitignore /tmp/www_root/.git /tmp/www_root/README.md
rm -rf /tmp/www_root/.gitlab-ci.yml /tmp/www_root/script
rm -rf $WWW_ROOT_DIR/www_root.zip
cd /tmp
zip -rq $WWW_ROOT_DIR/www_root.zip www_root || throw_error
cd $WWW_ROOT_DIR

# 4. commit
git add . || throw_error
git commit -m "Auto Build By `whoami`:
 $USER : $MESSAGE，
 project_url:$URL,
 共耗时："$(($(date +%s) - ${BUILD_START}))" 秒
 " || throw_error
git push || throw_error

echo "Build Finish!"