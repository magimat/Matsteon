# Matsteon


## build docker image

```		
cd ~
git clone git@github.com:magimat/Matsteon.git
cd Matsteon
docker build -t magimat/matsteon .
docker push magimat/matsteon
```

## run docker 

```
docker run -p 3000:80 --name matsteon --device=/dev/insteonPLM -d --restart unless-stopped magimat/matsteon
```




Librairie Insteon:  https://github.com/automategreen/home-controller#lighting-functions




### Installation en service pour démarrage automatique au reboot . (DEPRECATED, use docker instead)


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

```sudo chmod 755 /etc/init.d/matsteon```


#### Ajouter boot services

```sudo update-rc.d matsteon defaults```


#### Supprimer du boot services

```update-rc.d matsteon remove```

### start / stop

```sudo service matsteon start```

```sudo service matsteon stop```

