import {Component} from 'react';
import {v4 as uuid} from 'uuid'

const INITIAL_STATE = {
   name:'',
   phone:'',
}

export class ContactForm extends Component{
   state = INITIAL_STATE

   handleChangeForm = ({target}) => {
      const {name , value}= target
      this.setState({ [name]: value })
   }

   handleFormSubmit = (e) => {
      e.preventDefault()

      const { name, phone } = this.state
      const { onAdd } = this.props

      const isValidatedForm = this.validateForm()

      if (!isValidatedForm) return 
      onAdd ({ id: uuid(), name, phone})
      this.resetForm()
   }

   validateForm = () => {
      const { name, phone } = this.state;
      const { onCheckUnique } = this.props
      if (!name || !phone) {
         alert('Some field is empty')
         return false
      }
         return onCheckUnique(name)
   }

   resetForm = () => this.setState(INITIAL_STATE)
   render(){
      const { name, phone} = this.state
      return(
         <form onSubmit={this.handleFormSubmit}>
            <input type='text' name='name' placeholder='Enter Name' value={name} onChange = {this.handleChangeForm}/>
            <input type='tel' name='phone' 
                  pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                  title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                  required
                  placeholder='Enter Number'
                  value={phone} 
                  onChange = {this.handleChangeForm} />
            <button type='submit'>Add Contact</button>
         </form>
      )
   }
} 