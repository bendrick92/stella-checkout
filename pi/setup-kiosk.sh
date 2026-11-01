#!/bin/bash
# Run on the Pi: sudo ./setup-kiosk.sh http://<mac-ip>:5173
# Installs cage (single-app Wayland compositor) + Chromium and starts it fullscreen on boot.
set -euo pipefail
URL="${1:?usage: sudo $0 <url>}"
USER_NAME=stella-pi

apt-get update
apt-get install -y --no-install-recommends cage chromium

cat > /etc/systemd/system/kiosk.service <<UNIT
[Unit]
Description=Chromium kiosk
After=systemd-user-sessions.service network-online.target getty@tty1.service
Wants=network-online.target
Conflicts=getty@tty1.service

[Service]
User=$USER_NAME
PAMName=login
TTYPath=/dev/tty1
StandardInput=tty
TTYReset=yes
TTYVHangup=yes
UtmpIdentifier=tty1
UtmpMode=user
# profile in /tmp so the kiosk keeps working on a read-only root
ExecStart=/usr/bin/cage -s -- /usr/bin/chromium --kiosk --ozone-platform=wayland --noerrdialogs --disable-infobars --no-first-run --disable-session-crashed-bubble --user-data-dir=/tmp/chromium-kiosk $URL
Restart=always
RestartSec=3

[Install]
WantedBy=graphical.target
UNIT

systemctl daemon-reload
systemctl set-default graphical.target
systemctl enable kiosk.service
echo "Done. Reboot to start the kiosk: sudo reboot"
