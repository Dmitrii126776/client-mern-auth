import React, {useEffect, useState} from 'react';

const CountDownTime = () => {
    const [countdown, setCountdown] = useState({
        days: '00',
        hours: '00',
        minutes: '00',
        seconds: '00'
    });
    const [isBirthday, setIsBirthday] = useState(false);
    const [isCountdownReady, setIsCountdownReady] = useState(false);

    useEffect(() => {
        const endDate = new Date('2023-09-25T00:00:00-04:00').getTime();

        const updateCountdown = () => {
            const now = new Date().getTime();
            const timeRemaining = endDate - now;

            if (timeRemaining > 0) {
                const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24)).toString().padStart(2, '0');
                const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, '0');
                const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
                const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000).toString().padStart(2, '0');

                setCountdown({days, hours, minutes, seconds});
                setIsCountdownReady(true);
            } else {
                setIsBirthday(true);
            }
        };

        const timer = setInterval(updateCountdown, 1000);

        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <div className="infographic-bookie__countdown">
            {isCountdownReady && !isBirthday && (
                <h4>Dima's Birthday - 25 September</h4>
            )}
            {isCountdownReady && !isBirthday ? (
                <div className="countdown js-countdown d-flex g-2">
                    <div className="countdown__item d-flex flex-column">
                        <span style={{fontSize: '36px', minWidth: '70px', maxHeight: '40px'}}
                              className="countdown__time js-countdown-days">{countdown.days}</span>
                        <span className="countdown__text js-countdown-text">
              {countdown.days === '01' ? 'day' : 'days'}
                        </span>
                    </div>
                    <div className="countdown__item-separator"></div>
                    <div className="countdown__item d-flex flex-column">
                        <span style={{fontSize: '36px', minWidth: '70px', maxHeight: '40px'}}
                              className="countdown__time js-countdown-hours">{countdown.hours}</span>
                        <span className="countdown__text js-countdown-text">
                             {countdown.hours === '01' ? 'hour' : 'hours'}
                        </span>
                    </div>
                    <div className="countdown__item-separator"></div>
                    <div className="countdown__item d-flex flex-column ">
                        <span style={{fontSize: '36px', maxHeight: '40px', minWidth: '70px'}}
                              className="countdown__time js-countdown-minutes">{countdown.minutes}</span>
                        <span className="countdown__text js-countdown-text">
                            {countdown.minutes === '01' ? 'minute' : 'minutes'}
                        </span>
                    </div>
                    <div className="countdown__item-separator"></div>
                    <div className="countdown__item d-flex flex-column ">
                        <span style={{fontSize: '36px', maxHeight: '40px', minWidth: '70px'}}
                              className="countdown__time js-countdown-seconds">{countdown.seconds}</span>
                        <span className="countdown__text js-countdown-text">
                            {countdown.seconds === '00' ? 'second' : (countdown.seconds === '01' ? 'second' : 'seconds')}
                        </span>
                    </div>
                </div>
            ) : null}
            {isBirthday && (
                <div>
                    <h1 style={{color: "wheat"}}>Happy birthday to you, dear Dima !!!</h1>
                </div>
            )}
        </div>
    );
};

export default CountDownTime;


