const app = () => {
    const notificationListTrigger = document.querySelector(".nav__notification-button");
    const notificationList = document.querySelector(".nav__notification--list");
    const menuTrigger = document.querySelector(".nav__profile-menu-button");
    const profileMenu = document.querySelector(".nav__profile-menu--content");
    const menuItems = profileMenu.querySelectorAll(
        '[role="menuitem"]'
    );

    const closeNotificationList = () => {
      notificationListTrigger.ariaExpanded = "false";
      notificationListTrigger.focus()
    }

    const handleNotificationListEscapeKeyPress = (event) => {
      if (event.key === "Escape") {
        toggleNotificationList();
      }
    }

    const openNotificationList = () => {
      notificationListTrigger.ariaExpanded = "true";
  
      notificationList.addEventListener(
        "keyup",
        handleNotificationListEscapeKeyPress
      );
    }

    const toggleNotificationList = () => {
      const isListExpanded = notificationListTrigger.attributes["aria-expanded"].value === "true";
      notificationList.classList.toggle("active");

      if (isListExpanded) {
        closeNotificationList();
      }else {
        openNotificationList();
      }
    }

    const closeMenu = () => {
        menuTrigger.ariaExpanded = "false";
        menuTrigger.focus();
      }
    
    const handleMenuEscapeKeypress = (event) => {
        // if user pressed escape key
        if (event.key === "Escape") {
          toggleMenu();
        }
      }
    
    const handleMenuItemArrowKeyPress = (
        event,
        itemIndex
      ) => {
        // create some helpful variables : isLastMenuItem, isFirstMenuItem
        const isLastMenuItem =
          itemIndex === menuItems.length - 1;
        const isFirstMenuItem = itemIndex === 0;
    
        const nextMenuItem = menuItems.item(
          itemIndex + 1
        );
        const previousMenuItem = menuItems.item(
          itemIndex - 1
        );
    
        // if the user pressed arrow right or arrow down
        if (
          event.key === "ArrowRight" ||
          event.key === "ArrowDown"
        ) {
          // if user is on last item, focus on first menuitem
          if (isLastMenuItem) {
            menuItems.item(0).focus();
    
            return;
          }
          // then focus on next menu item
          nextMenuItem.focus();
        }
    
        // if the user pressed arrow up or arrow left
        if (
          event.key === "ArrowUp" ||
          event.key === "ArrowLeft"
        ) {
          if (isFirstMenuItem) {
            menuItems.item(menuItems.length - 1).focus();
            return;
          }
    
          previousMenuItem.focus();
        }
        // then focus on the previous menu item
        // if the user is on first menu item, focus on last menuitem
      }
    
      const openMenu = () => {
        menuTrigger.ariaExpanded = "true";
        menuItems.item(0).focus();
    
        profileMenu.addEventListener(
          "keyup",
          handleMenuEscapeKeypress
        );
    
        // for each menu item, register an event listener for the keyup event
        menuItems.forEach((
          item,
          itemIndex
        ) => {
          item.addEventListener("keyup", (event) => {
            handleMenuItemArrowKeyPress(event, itemIndex);
          });
        });
      }
    
      const toggleMenu = () => {
        const isMenuExpanded =
          menuTrigger.attributes["aria-expanded"].value ===
          "true";
        profileMenu.classList.toggle("active");
    
        if (isMenuExpanded) {
          closeMenu();
        } else {
          openMenu();
        }
      }
    
      menuTrigger.addEventListener("click", toggleMenu);
      notificationListTrigger.addEventListener("click", toggleNotificationList);

}

app()