import React, {useRef, useState} from 'react'
import {Link} from 'react-router-dom'

import TextInput from '../../components/TextInput/TextInput'
import Button from '../../components/Button/Button'

import CalendarMember from '../../components/CalendarMember/CalendarMember'
import styles from './CalendarSettings.module.css'
import axios from 'axios'

export default function CalendarSettings({calendar, onUpdate}){
    const inputRef = useRef()

    const [pendingMembers, updatePendingMembers] = useState([])

    const addMember = async function(){
        const email = inputRef.current.value
        inputRef.current.value = ''
        updatePendingMembers(members=>[...members, email])

        await axios.post(`/api/add-group-member`, {
            groupID: calendar.id,
            newMemberEmail: email
        })

        if(onUpdate && typeof onUpdate === 'function')
            onUpdate()
    }

    // Dedupe members so just added ones aren't shown twice
    let seenUsers = {}
    const members = calendar.users.filter(user=>{
        if(seenUsers[user.email])
            return false
        seenUsers[user.email] = true
        return true
    })

    const pending = pendingMembers.filter(email=>{
        if(seenUsers[email])
            return false
        seenUsers[email] = true
        return true
    })

    return (
        <div className={styles.SettingsContainer}>
            <Link to={`/calendar/${calendar.id}`} className={styles.SettingsScrim}></Link>
            <div className={styles.ModalContainer}>
                <div className={styles.SettingsModal}>
                    <h2 className={styles.SettingsHeader}>Editing {calendar.name}</h2>
                    <h3>Members:</h3>
                    {members.map(user=>(
                        <CalendarMember key={user.id} member={user}/>
                    ))}
                    {pending.map(email=>(
                        <CalendarMember key={email} member={{email}} pending="true"/>
                    ))}

                    <h3>Add Member:</h3>
                    <form onSubmit={ev=>{ev.preventDefault(); addMember()}}>
                        <TextInput inputRef={inputRef} label="Email"/>
                        <Button type="submit">Add</Button>
                    </form>
                </div>
            </div>
        </div>
    )
}
