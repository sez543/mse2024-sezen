#! /bin/sh

if [ -z "$APP_ENV_PREFIX" ]; then
    echo "APP_ENV_PREFIX is not set. Exiting."
    exit 1
fi

env

for i in $(env | grep "^$APP_ENV_PREFIX"); do
    key=$(echo "$i" | cut -d '=' -f 1)
    value=$(echo "$i" | cut -d '=' -f 2-)

    echo "$key=$value"

    find "/usr/share/nginx/html/" -type f -exec sed -i -e "s|\${[a-zA-Z.]*${key}}|${value}|g" '{}' +
done