#!/bin/bash
set -e
# Dev entrypoint - does NOT chown project files.
# The project root is a host bind-mount; chowning to www-data would strip
# the host user's write permissions. All chown logic is intentionally omitted.
# forward request and error logs to docker log collector
ln -sf /dev/stdout /var/log/nginx/access.log 2>/dev/null || true
ln -sf /dev/stderr /var/log/nginx/error.log 2>/dev/null || true
ln -sf /dev/stdout /var/log/nginx/mediacms.io.access.log 2>/dev/null || true
ln -sf /dev/stderr /var/log/nginx/mediacms.io.error.log 2>/dev/null || true
cp /home/mediacms.io/mediacms/deploy/docker/local_settings.py /home/mediacms.io/mediacms/cms/local_settings.py
mkdir -p /home/mediacms.io/mediacms/{logs,media_files/hls}
touch /home/mediacms.io/mediacms/logs/debug.log
mkdir -p /var/run/mediacms
chmod +x /home/mediacms.io/mediacms/deploy/docker/start.sh /home/mediacms.io/mediacms/deploy/docker/prestart.sh
exec "$@"
