import '../css/style.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

window.onload = () => {
  //01.gnb 애니메이션
  const menuOpen = document.querySelector('.gnb .menuOpen');
  const menuBox = document.querySelector('.gnb .menuBox');

  menuOpen.addEventListener('click', () => {
    menuBox.classList.toggle('on');
  });

  gsap.registerPlugin(ScrollTrigger);

  //01.visual
  gsap
    .timeline({
      defaults: {
        ease: 'none',
        duration: 5,
      },
      scrollTrigger: {
        trigger: '.visual .inner',
        start: 'top top',
        scrub: 1,
        invalidateOnRefresh: true,
      },
    })
    .to('.logoWrap #J', { xPercent: -70, yPercent: 100, rotate: 20 }, 0)
    .to('.logoWrap #Y', { xPercent: -30, yPercent: 80, rotate: -10 }, 0)
    .to('.logoWrap #O', { xPercent: 0, yPercent: 150, rotate: -10 }, 0)
    .to('.logoWrap #U', { xPercent: 30, yPercent: 200, rotate: 10 }, 0)
    .to('.logoWrap #N', { xPercent: 50, yPercent: 70, rotate: -10 }, 0)
    .to('.logoWrap #G', { xPercent: 70, yPercent: 200, rotate: 20 }, 0);

  //02. 공통 .mainTextBox .title
  gsap.utils.toArray('.mainTextBox .title i').forEach((selector) => {
    gsap
      .timeline({
        scrollTrigger: {
          trigger: selector,
          start: '100% 100%',
          end: '100% 100%',
          scrub: 1,
        },
      })
      .fromTo(selector, { y: 150 }, { y: 0, ease: 'none', duration: 5 });
  });

  //03. 공통 .subText p
  gsap.utils.toArray('.subText p').forEach((selector) => {
    gsap
      .timeline({
        scrollTrigger: {
          trigger: selector,
          end: '100% 100%',
          scrub: 1,
          invalidateOnRefresh: true,
          // markers: true,
        },
      })
      .fromTo(
        selector,
        { opacity: 0, y: 100 },
        { opacity: 1, y: 0, ease: 'none', duration: 5 },
        0
      );
  });

  //04. con1 .textAni
  const con1TextAniDur = 0.7;
  gsap.timeline({ repeat: -1 }).to('.con1 .textAni li', {
    opacity: 1,
    x: 0,
    duration: con1TextAniDur,
    ease: 'power4.out',
    stagger: { each: con1TextAniDur * 2, repeat: 1, yoyo: true },
  });
  gsap.to(
    '.con1 .textAni i',
    {
      opacity: 1,
      repeat: -1,
      yoyo: true,
      duration: con1TextAniDur,
      ease: 'power4.out',
    },
    0
  );

  //03. con3 listBox
  ScrollTrigger.batch('.con3 .listBox li', {
    interval: 0.2,
    onEnter: (elems) => {
      gsap.to(elems, {
        rotationX: 0,
        z: 0,
        opacity: 1,
        stagger: 0.1,
      });
    },
    onLeaveBack: (elems) => {
      gsap.set(elems, { rotateX: -65, z: -500, opacity: 0 });
    },
  });
  gsap.set('.con3 .listBox li', { rotateX: -65, z: -500, opacity: 0 });

  //05. con4 .listBox
  gsap.utils.toArray('.con4 .listBox .box').forEach((selector) => {
    gsap
      .timeline({
        scrollTrigger: {
          trigger: selector,
          start: '0% 20%',
          end: '0% 0%',
          scrub: 1,
        },
      })
      .to(selector, {
        transform: 'rotateX(-10deg) scale(0.9)',
        transformOrigin: 'top',
        filter: 'brightness(0.3)',
      });
  });

  //07 .con5 .listBox
  const listBox = document.querySelectorAll('.con5 .listBox li');
  const imgBox = document.querySelector('.con5 .imgBox');
  const img = document.querySelector('.con5 .imgBox img');

  for (let i = 0; i < listBox.length; i++) {
    listBox[i].addEventListener('mouseenter', () => {
      img.src = `images/img${i}.jpg`;
      gsap.set(imgBox, { scale: 0, opacity: 0 });
      gsap.to(imgBox, { scale: 1, opacity: 1, duration: 0.3 });
    });
    listBox[i].addEventListener('mousemove', (e) => {
      const imgBoxX = e.pageX + 20;
      const imgBoxY = e.pageY - 20;
      imgBox.style.left = imgBoxX + 'px';
      imgBox.style.top = imgBoxY + 'px';
    });
    listBox[i].addEventListener('mouseleave', () => {
      gsap.to(imgBox, { scale: 0, opacity: 0, duration: 0.3 });
    });
  }

  gsap.timeline({
    scrollTrigger: {
      trigger: '.con5',
      toggleClass: { targets: 'body', className: 'on' },
    },
  });

  //08. footer
  gsap
    .timeline({
      scrollTrigger: {
        trigger: 'footer',
        end: 'bottom bottom',
        scrub: 1,
        invalidateOnRefresh: true,
      },
    })
    .fromTo(
      'footer .logoWrap',
      { yPercent: -300 },
      { yPercent: -50, ease: 'none', duration: 5 }
    );
};

//09. loading
setTimeout(() => document.querySelector('.loading').classList.add('scene1'), 0);
setTimeout(
  () => document.querySelector('.loading').classList.add('scene2'),
  1500
);
setTimeout(() => {
  document.querySelector('.loading').style.display = 'none';
  document.querySelectorAll('.rotate').forEach((elem) => {
    elem.classList.add('on');
  });
  document.querySelectorAll('.opacity').forEach((elem) => {
    elem.classList.add('on');
  });
  // gsap.set('.wrap', { overflow: 'hidden' });
  setTimeout(() => gsap.set('.wrap', { overflow: 'visible' }), 1200);
}, 2500);
