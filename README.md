# Matsteon

    symlink usb 

		  sudo vi /etc/udev/rules.d/99-usb.rules 
		  KERNELS=="1-1.4:1.0", SUBSYSTEM=="tty", SYMLINK+="insteonPLM"


		build image
			cd ~
			git clone git@github.com:magimat/Matsteon.git
			cd Matsteon
			docker build -t magimat/matsteon .
        	docker push magimat/matsteon

		 docker run -p 3000:3000 --name matsteon --device=/dev/insteonPLM -d --restart unless-stopped magimat/matsteon



Librairie Insteon:  https://github.com/automategreen/home-controller#lighting-functions

