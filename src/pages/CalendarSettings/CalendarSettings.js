import React, {useRef, useState, useEffect} from 'react'
import {Link} from 'react-router-dom'

import TextInput from '../../components/TextInput/TextInput'
import Button from '../../components/Button/Button'

import CalendarMember from '../../components/CalendarMember/CalendarMember'
import styles from './CalendarSettings.module.css'
import axios from 'axios'

export default function CalendarSettings({calendar, onUpdate}){
    const inputRef = useRef()

    const [pendingMembers, updatePendingMembers] = useState([])
    const [error, setError] = useState(null)

    const addMember = async function(){
        const email = inputRef.current.value
        setError(null)

        // Don't do anything if empty
        if(!email) return;

        // Clear input
        inputRef.current.value = ''

        // Add item with spinner to list
        updatePendingMembers(members=>[...members, email])

        try {
            // Make request to add member
            const res = axios.post(`/api/add-group-member`, {
                groupID: calendar.id,
                newMemberEmail: email
            })

            // Wait for half second for UI consistency
            await new Promise(r=>setTimeout(r,500))

            // Wait until request finishes
            await res
        } catch (err) {
            // Handle error (removing spinner from list)
            setError(err.response.data.error)
            updatePendingMembers(members=>members.filter(m=>m !== email))
        }

        // Tell parent to update data
        if(onUpdate && typeof onUpdate === 'function')
            onUpdate()
    }

    const removeMember = async function(userID){
        const groupID = calendar.id

        try {
            await axios.post('/api/delete-group-member', {
                userID, groupID
            })
        } catch (err) {
            setError(err.response.data.error)
        }

        // Tell parent to update data
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

    let dupes = []
    const pending = pendingMembers.filter(email=>{
        if(seenUsers[email]){
            dupes.push(email)
            return false
        }
        seenUsers[email] = true
        return true
    })

    // Check for added members and remove them from the pending array
    useEffect(()=>{
        if(dupes.length)
            updatePendingMembers(members=>{
                return members.filter(member=>!dupes.includes(member))
            })
    }, [updatePendingMembers, dupes])

    return (
        <div className={styles.SettingsContainer}>
            <Link to={`/calendar/${calendar.id}`} className={styles.SettingsScrim}></Link>
            <div className={styles.ModalContainer}>
                <div className={styles.SettingsModal}>
                    <h2 className={styles.SettingsHeader}>Editing {calendar.name}</h2>
                    <h3>Members:</h3>
                    {members.map(user=>(
                        <CalendarMember key={user.id} member={user} remove={ev=>{ev.preventDefault(); removeMember(user.id)}}/>
                    ))}
                    {pending.map(email=>(
                        <CalendarMember key={email} member={{email}} pending="true"/>
                    ))}

                    <h3>Add Member:</h3>
                    <form onSubmit={ev=>{ev.preventDefault(); addMember()}}>
                        <TextInput inputRef={inputRef} label="Email"/>
                        <Button type="submit">Add</Button>
                    </form>
                    {error && (
                        <div className={styles.Error}>
                            {error}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
