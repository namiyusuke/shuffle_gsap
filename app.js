const random_char = () => {
  const possible =
    "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~" + "0123456789" + "ABCDEFGHIJKLMNOPQRSTUVWXYZ" + "abcdefghijklmnopqrstuvwxyz";
  return possible.charAt(Math.floor(Math.random() * possible.length));
};

const mask = (chars, progress) => {
  const masked = [];

  for (let i = 0; i < chars.length; i++) {
    const position = (i + 1) / chars.length;
    if (position > progress) {
      masked.push(random_char());
    } else {
      masked.push(chars[i]);
    }
  }

  return masked.join("");
};

const shuffle = (el) => {
  const chars = el.textContent.split("");

  const params = {
    progress: 0,
  };

  const tl = gsap.timeline({
    onUpdate: () => {
      el.textContent = mask(chars, params.progress);
    },
    onComplete: () => {
      el.classList.add("completed");
    },
  });

  tl.to(params, {
    progress: 1,
    delay: 1,
    duration: 1,
    ease: "power1.inOut",
  });

  el.onclick = () => {
    el.classList.remove("completed");
    tl.restart();
  };
};

const elements = document.querySelectorAll(".shuffle");
elements.forEach((el) => {
  shuffle(el);
});
