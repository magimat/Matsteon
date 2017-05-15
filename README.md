# Matsteon


### Installation en service pour démarrage automatique au reboot


#### Install forever

```sudo -i npm install forever -g```


#### Créer fichier service

sudo nano /etc/init.d/matsteon 

```
#!/bin/sh
#/etc/init.d/matsteon
export PATH=$PATH:/usr/local/bin
export NODE_PATH=$NODE_PATH:/usr/lib/node_modules

case "$1" in
start)
exec forever start --id "matsteon" --sourceDir=/home/pi/Matsteon -p /home/pi/Matsteon/ -a -l /home/pi/Matsteon/matsteon.log -e /home/pi/Matsteon/matsteon.log -o /home/pi/Matsteon/matsteon.log matsteon.js
;;
stop)
exec forever stop --sourceDir=/home/pi/Matsteon matsteon
;;
*)
echo "Usage: /etc/init.d/matsteon {start|stop}"
exit 1
;;
esac
exit 0
```


#### Rendre exécutable

```chmod 755 /etc/init.d/matsteon```


#### Ajouter boot services

```update-rc.d matsteon defaults```


#### Supprimer du boot services

```update-rc.d matsteon remove```



