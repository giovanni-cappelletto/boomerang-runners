import React from "react";
import { Link } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import eventBg from '../assets/event__bg.png'
import settingsIcon from '../assets/settings_icon.svg'
import Title from '../components/Title'
import Button from '../components/Button'
import EventStyles from '../pages/all-events/all-events2.module.css'

const Event = ({ eventId, title, date, desc, link, createEventView }) => {
    const { user } = useAuth0()

    return (
        <div className={EventStyles.event}>
            <img src={eventBg} alt="Event Background" className={EventStyles.event__image} draggable="false" />

            <div className={EventStyles.event__content}>
                <h1 className={EventStyles.event__title}>
                    <Title text={title} />
                </h1>
                <span className={EventStyles.event__date}>{ date }</span>
                <p className={EventStyles.event__desc}>{ desc }</p>
                
                <div className={EventStyles.btn_container}>
                    {(user.sub === 'auth0|64b82dbfb6c808c6f9cc6f70' && !createEventView) 
                        ? (
                            <Link to={`/settings?event=${eventId}`} >
                                <Button className="light settings-btn">
                                    <img src={settingsIcon} alt="Settings button"/>
                                </Button>
                            </Link>
                        ) : (
                            <>
                                <Button className="light" text="Iscriviti"/>
                                <a href={link} target="_blank" className={EventStyles.event__link}>Maggiori info</a>
                            </>
                        )
                    }
                </div>
            </div>
        </div>
    );
}

export default Event