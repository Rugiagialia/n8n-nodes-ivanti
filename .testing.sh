cd /home/ubuntu/n8n-nodes-ivanti/testing.sh
npm run build
sudo npm link
cd /usr/lib/node_modules/n8n
sudo npm link n8n-nodes-ivanti
n8n start
