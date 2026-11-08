import { modifierCounter } from "./counter.js";

const section = document.querySelector(".section");
let timerNotification;

const notification = document.createElement("p");

notification.classList.add(
        "z-50",
        "fixed",
        "text-white",
        "text-center",
        "rounded-[10px]",

        "w-[90%]",
        "right-[5%]",
        "top-[90px]",
        "h-[60px]",
        "!pt-[10px]",

        "md:w-[60%]",
        "md:right-[155px]",
        "md:top-[90px]",
        "!pt-[16px]",

        "lg:w-[40%]",
        "lg:right-[40px]",
        "lg:top-[88px]",
        "lg:!pt-[16px]",

        "xl:w-[30%]",
        "xl:right-[43px]"
);



export function notificationMsg(msg, bgColorAdd, bgColorRemove) {

        modifierCounter();

        notification.textContent = msg;
        notification.classList.remove(bgColorRemove);
        notification.classList.add(bgColorAdd);
        section.append(notification);


        clearTimeout(timerNotification);

        timerNotification = setTimeout(() => {
                notification.remove();
        }, 3000);
}