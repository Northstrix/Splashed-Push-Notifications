import React from 'react';
import './index.css'; // Assuming the CSS is in index.css
import styles from './notification-styles.module.css';

const SplashedPushNotifications: React.FC = () => {
    const notificationContainerRef = React.useRef<HTMLDivElement | null>(null);
    const rtlNotificationContainerRef = React.useRef<HTMLDivElement | null>(null);

    const messages: Record<string, string[]> = {
        help: [
        ],
        success: [
        ],
        warning: [
        ],
        error: [
        ]
    };

    type NotificationType = keyof typeof messages;

    const createNotification = (type: NotificationType, notificationTitle: string, notificationContent: string) => {
      if (notificationContainerRef.current) {
          const notif = document.createElement('div');
          notif.classList.add(styles.toast, styles[type]); // Ensure styles is properly imported
  
          // Create title and content
          const title = document.createElement('h3');
          title.textContent = notificationTitle;
          title.style.margin = '0';
  
          const content = document.createElement('p');
          content.textContent = notificationContent;
          content.style.margin = '0.25rem 0';
  
          // Create timer and close button
          const timerContainer = document.createElement('div');
          timerContainer.classList.add(styles.timer);
  
          const closeButton = document.createElement('button');
          closeButton.textContent = '✖';
          closeButton.classList.add(styles.closeButton);
          closeButton.onclick = () => { removeNotification(notif); };
  
          // Append elements to notification
          notif.appendChild(closeButton);
          notif.appendChild(title);
          notif.appendChild(content);
          notif.appendChild(timerContainer);
  
          // Create timer divs
          const timerLeft = document.createElement('div');
          timerLeft.classList.add(styles.timerLeft);
  
          const timerRight = document.createElement('div');
          timerRight.classList.add(styles.timerRight);
  
          // Append timer halves in swapped order
          timerContainer.appendChild(timerRight);
          timerContainer.appendChild(timerLeft);
  
          // Append notification to container
          notificationContainerRef.current.appendChild(notif);
  
          // Trigger animations for appearance
          notif.style.animation = 'slideInWithBounce 0.6s ease forwards';
          
          const duration = 5000; // Set duration to 5 seconds
  
          // Generate a unique ID for this notification (only once)
          const uniqueId = Date.now();
  
          // Set initial animation for both sides of the timer with uniqueId
          setTimerAnimation(timerLeft, timerRight, duration, uniqueId);
  
          // Set timeout to remove notification after duration
          let timeoutId: NodeJS.Timeout;
          
          timeoutId = setTimeout(() => removeNotification(notif), duration);
          
          let remainingTime = duration; // Track remaining time
  
          // Pause timer on hover and store remaining time
          notif.addEventListener("mouseenter", () => {
              clearTimeout(timeoutId);  // Stop the timeout
              
              const computedWidth = parseFloat(getComputedStyle(timerLeft).width);
              const totalWidth = parseFloat(getComputedStyle(timerContainer).width);
              const elapsedTime = (computedWidth / totalWidth) * duration; // Calculate elapsed time
              
              remainingTime = duration - elapsedTime; // Calculate remaining time
              (timerLeft as HTMLElement).style.animationPlayState = "paused";
              (timerRight as HTMLElement).style.animationPlayState = "paused";
          });
  
          // Resume timer on mouse leave with restored remaining time
          notif.addEventListener("mouseleave", () => {
              if (remainingTime > 0) {
                  setTimerAnimation(timerLeft, timerRight, duration, uniqueId);
                  timeoutId = setTimeout(() => removeNotification(notif), duration - remainingTime);
                  (timerLeft as HTMLElement).style.animationPlayState = "running";
                  (timerRight as HTMLElement).style.animationPlayState = "running";
              }
          });
      }
  };
  
  const createRtlNotification = (type: NotificationType, notificationTitle: string, notificationContent: string) => {
    if (rtlNotificationContainerRef.current) {
        const notif = document.createElement('div');
        notif.classList.add(styles.toast, styles[type], styles.rtl); // Ensure styles is properly imported

        // Create title and content
        const title = document.createElement('h3');
        title.textContent = notificationTitle;
        title.style.margin = '0';
        title.style.transform = 'scale(-1, 1)'; // Apply horizontal mirroring for RTL effect
        title.style.textAlign = 'right';
        title.style.direction = 'rtl';

        const content = document.createElement('p');
        content.textContent = notificationContent;
        content.style.margin = '0.25rem 0';
        content.style.transform = 'scale(-1, 1)'; // Apply horizontal mirroring for RTL effect
        content.style.textAlign = 'right';
        content.style.direction = 'rtl';

        // Create timer and close button
        const timerContainer = document.createElement('div');
        timerContainer.classList.add(styles.timer);
        
        const closeButton = document.createElement('button');
        closeButton.textContent = '✖';
        closeButton.classList.add(styles.closeButton);
        closeButton.onclick = () => { removeNotification(notif); };

        // Append elements to notification
        notif.appendChild(closeButton);
        notif.appendChild(title);
        notif.appendChild(content);
        notif.appendChild(timerContainer);

        // Create timer divs
        const timerLeftRtl = document.createElement('div');
        timerLeftRtl.classList.add(styles.timerLeft);
        
        const timerRightRtl = document.createElement('div');
        timerRightRtl.classList.add(styles.timerRight);

        // Append timer halves in swapped order
        timerContainer.appendChild(timerRightRtl);
        timerContainer.appendChild(timerLeftRtl);

        // Append notification to container
        rtlNotificationContainerRef.current.appendChild(notif);

        // Trigger animations for appearance
        notif.style.animation = 'slideInWithBounce 0.6s ease forwards';

        const durationRtl = 5000; // Set duration to 5 seconds

        // Generate a unique ID for this notification (only once)
        const uniqueIdRtl = Date.now();

        // Set initial animation for both sides of the timer with uniqueId
        setTimerAnimation(timerLeftRtl, timerRightRtl, durationRtl, uniqueIdRtl);

        let timeoutIdRtl: NodeJS.Timeout;
        
        // Set timeout to remove notification after duration
        timeoutIdRtl = setTimeout(() => removeNotification(notif), durationRtl);

        let remainingTime = durationRtl; // Track remaining time

        // Pause timer on hover and store remaining time
        notif.addEventListener("mouseenter", () => {
            clearTimeout(timeoutIdRtl); // Stop the timeout

            const computedWidth = parseFloat(getComputedStyle(timerLeftRtl).width);
            const totalWidth = parseFloat(getComputedStyle(timerContainer).width);
            const elapsedTime = (computedWidth / totalWidth) * durationRtl; // Calculate elapsed time

            remainingTime = durationRtl - elapsedTime; // Calculate remaining time
            (timerLeftRtl as HTMLElement).style.animationPlayState = "paused";
            (timerRightRtl as HTMLElement).style.animationPlayState = "paused";
        });

        // Resume timer on mouse leave with restored remaining time
        notif.addEventListener("mouseleave", () => {
            if (remainingTime > 0) {
                setTimerAnimation(timerLeftRtl, timerRightRtl, durationRtl, uniqueIdRtl);
                timeoutIdRtl = setTimeout(() => removeNotification(notif), remainingTime);
                (timerLeftRtl as HTMLElement).style.animationPlayState = "running";
                (timerRightRtl as HTMLElement).style.animationPlayState = "running";
            }
        });
    }
};

  const setTimerAnimation = (timerLeft: HTMLElement, timerRight: HTMLElement, duration: number, uniqueId: number) => {
      const stylesheet = document.createElement("style");
      stylesheet.type = "text/css";
      stylesheet.innerHTML = `
        @keyframes timerShrink-${uniqueId} {
            from { width: 100%; }
            to { width: 0; }
        }
      `;
      document.head.appendChild(stylesheet);
  
      // Start animations with full width
      timerLeft.style.animation = `timerShrink-${uniqueId} ${duration}ms linear forwards`;
      timerRight.style.animation = `timerShrink-${uniqueId} ${duration}ms linear forwards`;
  };
  
  const removeNotification = (notif: HTMLElement) => {
      notif.style.animation = 'slideOutWithBounce 0.6s ease forwards'; 
  
      setTimeout(() => {
         notif.remove();
      }, 600); 
  };
  
  // Dynamically create keyframes for animations in JavaScript
  React.useEffect(() => {
      const stylesheet = document.createElement("style");
      stylesheet.type = "text/css";
      
      stylesheet.innerHTML = `
          @keyframes slideInWithBounce {
            0% { transform: translateX(150%); opacity: 0; }
            60% { transform: translateX(-12%); opacity: 1; }
            100% { transform: translateX(0); opacity: 1; }
          }
  
          @keyframes slideOutWithBounce {
            0% { transform: translateX(0); opacity: 1; }
            40% { transform: translateX(-12%); opacity: 1; }
            100% { transform: translateX(150%); opacity: 0; }
          }
      `;
      
      document.head.appendChild(stylesheet);
      
      return () => {
          document.head.removeChild(stylesheet); 
      };
  }, []);
  

  return (
    <div className={styles.wrapper}>
        <h2 style={{ color: 'white', textAlign: 'center', fontSize: '50px' }}>Splashed Push Notifications</h2>
        <div className={styles.buttonContainer}>
            <button onClick={() => createNotification('help', 'James Matthew Barrie', 'Would you like an adventure now, or would you like to have your tea first?')}>Help</button>
            <button onClick={() => createNotification('success', 'Anaïs Nin', "We don't see things as they are, we see them as we are.")}>Success</button>
            <button onClick={() => createNotification('warning', 'Oscar Wilde', 'There are only two tragedies in life: One is not getting what one wants, and the other is getting it.')}>Warning</button>
            <button onClick={() => createNotification('error', 'Lao Tzu', 'When I let go of what I am, I become what I might be.')}>Error</button>
        </div>
        <div className={styles.buttonContainer}>
            {/* Hebrew Notifications */}
            <button onClick={() => createRtlNotification('help', 'ג\'יימס מתיו בארי', 'האם תרצי את ההרפתקה שלך עכשיו, או שמא נשתה תה לפני כן?')}>Help (Hebrew)</button>
            <button onClick={() => createRtlNotification('success', 'אנאיס נין', 'אנחנו לא רואים את הדברים כפי שהם, אנחנו רואים אותם כפי שאנחמו.')}>Success (Hebrew)</button>
            <button onClick={() => createRtlNotification('warning', 'אוסקר ויילד', 'יש רק שתי טרגדיות בעולם הזה. האחת היא לא לקבל את מה שרוצים והשנייה היא לקבל.')}>Warning (Hebrew)</button>
            <button onClick={() => createRtlNotification('error', 'לאו צה', 'כשאני מרפה ממי שאני, אני הופך למה שאפשרי עבורי להיות.')}>Error (Hebrew)</button>
        </div>
        <div className={styles.buttonContainer}>
            {/* Farsi Notifications */}
            <button onClick={() => createRtlNotification('help', 'جیمز متیو بری', 'آیا می‌خواهید اکنون یک ماجراجویی داشته باشید یا می‌خواهید اول چای خود را بنوشید؟')}>Help (Farsi)</button>
            <button onClick={() => createRtlNotification('success', 'آنا آیس نین', 'ما چیزها را همانطور که هستند نمی‌بینیم، ما آنها را همانطور که هستیم می‌بینیم.')}>Success (Farsi)</button>
            <button onClick={() => createRtlNotification('warning', 'اسکار وایلد', 'تنها دو تراژدی در زندگی وجود دارد: یکی این است که آنچه را که می‌خواهیم به دست نیاوریم و دیگری این است که آن را به دست آوریم.')}>Warning (Farsi)</button>
            <button onClick={() => createRtlNotification('error', 'لائو تزو', 'وقتی از آنچه هستم رها می‌شوم، به آنچه ممکن است باشم تبدیل می‌شوم.')}>Error (Farsi)</button>
        </div>
        <div className={styles.buttonContainer}>
            {/* Arabic Notifications */}
            <button onClick={() => createRtlNotification('help', 'جيمس ماثيو باري', 'هل تود أن تخوض مغامرة الآن، أم تود أن تتناول الشاي أولاً؟')}>Help (Arabic)</button>
            <button onClick={() => createRtlNotification('success', 'أنييس نين', 'نحن لا نرى الأشياء كما هي، نحن نراها كما نحن.')}>Success (Arabic)</button>
            <button onClick={() => createRtlNotification('warning', 'أوسكار وايلد', 'هناك مأساويتان فقط في الحياة: واحدة هي عدم الحصول على ما تريد، والأخرى هي الحصول عليه.')}>Warning (Arabic)</button>
            <button onClick={() => createRtlNotification('error', 'لاو تزو', 'عندما أترك ما أنا عليه، أصبح ما يمكن أن أكون.')}>Error (Arabic)</button>
        </div>

        <div ref={notificationContainerRef} className={styles.notificationContainer}></div>
        <div ref={rtlNotificationContainerRef} className={`${styles.notificationContainer} ${styles.rtlNotifications}`}></div>

        {/* Credit Section */}
        <div style={{ color: 'white', textAlign: 'center', marginTop: '40px' }}>
            The existence of this project wouldn't've been possible without the following:
            <br />
            <a href="https://codepen.io/josetxu/pen/OJGXdzY" style={{ textDecoration: 'underline', color: 'white' }}>https://codepen.io/josetxu/pen/OJGXdzY</a><br />
            <a href="https://codepen.io/FlorinPop17/pen/xxORmaB" style={{ textDecoration: 'underline', color: 'white' }}>https://codepen.io/FlorinPop17/pen/xxORmaB</a><br />
            <a href="https://www.perplexity.ai/" style={{ textDecoration: 'underline', color: 'white' }}>https://www.perplexity.ai/</a><br />
        </div>

        {/* GitHub Source Code Link */}
        <div style={{ color: 'white', textAlign: 'center', marginTop: '30px' }}>
            The source code is available on 
            <a href="https://github.com/Northstrix/Splashed-Push-Notifications" style={{ textDecoration: 'underline', color: 'white' }}> GitHub</a>.
        </div>
    </div>
);
};

export default SplashedPushNotifications;