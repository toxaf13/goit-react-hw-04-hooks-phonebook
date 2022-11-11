import React, {Component} from 'react';
import {ContactForm} from "./ContactForm/ContactForm";
import {ContactsList} from "./ContactsList/ContactsList";
import { Filter } from './filter/Filter';

export class App extends Component {
   state = {
      contacts: [
        {id: 'id-1', name: 'Rosie Simpson', phone: '459-12-56'},
        {id: 'id-2', name: 'Hermione Kline', phone: '443-89-12'},
        {id: 'id-3', name: 'Eden Clements', phone: '645-17-79'},
        {id: 'id-4', name: 'Annie Copeland', phone: '227-91-26'},
      ],
      filter: '',
      name: '',
      phone: ''
    }

   handleAddContact = (newContact) =>
      this.setState(({contacts}) =>({
         contacts:[...contacts, newContact],
   }))

   handleCheckUnique = (name) =>{
      const{ contacts } = this.state

      const isExistContact = !!contacts.find((contact) => contact.name === name)
      isExistContact && alert ('Contact is alredy exist')
      return !isExistContact 
   }
 
   handleRemoveContact = (id) => 
      this.setState(({ contacts })=>({contacts: contacts.filter((contact) => contact.id !==id) }))
   
   handleFilterChange = (filter) => this.setState({ filter })

   getVisibleContacts = () => {
      const { contacts, filter } = this.state;
      return contacts.filter((contact) => contact.name.toLowerCase().includes( filter.toLowerCase() ))
   }
   render(){
      const { filter } = this.state
      const visibleContacts = this.getVisibleContacts()
      return(
         <div style={{
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
            flexDirection: 'column',
            fontSize: 20,
            color: '#010101',
            padding: '20px 10px',
          }}>
         <h2>Form Contact</h2>  
         <ContactForm onAdd={this.handleAddContact} onCheckUnique = {this.handleCheckUnique}/>      
         <h2>Contacts List</h2>
         <Filter filter={filter} onChange={this.handleFilterChange}/>
         <ContactsList contacts={visibleContacts} onRemove = {this.handleRemoveContact}/>
         </div>
         )
   }

}
