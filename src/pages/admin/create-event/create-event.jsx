import React from 'react'
import Button from '../../../components/Button'
import Event from '../../../components/Event'
import createEventStyles from './create-event2.module.css'

const Input = ({ type = "text", placeholder }) => {
    return (
        <input type={type} placeholder={placeholder} className={createEventStyles.input} />
    )
}

const Form = () => {
    return (
        <form className={createEventStyles.create__form}>
            <Input placeholder="Nome" />
            <Input type="date" placeholder="Data" />
            <Input placeholder="Link per maggiori info" />
            <textarea placeholder="Descrizione" className={`${createEventStyles.input} ${createEventStyles.desc_field}`}></textarea>
            <Button className={`${createEventStyles.submit_btn} light`} text="Crea" />
        </form>
    )
}

const Section = ({ className, sectionTitle, sectionTitleClassName, children }) => {
    return (
        <section className={className}>
            <div className={createEventStyles.wrapper}>
                <h1 className={`${sectionTitleClassName} ${createEventStyles.title}`} >{sectionTitle}</h1>

                {children}
            </div>
        </section>
    )
}

const createEvent = () => {
    return (
        <main className={createEventStyles.main}>
            <Section className={createEventStyles.create_container} sectionTitle="Crea un evento" sectionTitleClassName={createEventStyles.create__title} >
                <Form />
            </Section>

            <Section className={createEventStyles.preview_container} sectionTitle="Preview" sectionTitleClassName={createEventStyles.preview__title}>
                <Event title="Ciao" date="2023-01-01" desc="Test" link="https://www.google.it" createEventView={true} />
            </Section>            
        </main>
    )
}

export default createEvent