   import React, { useState } from "react";
   import PropTypes from "prop-types";
   import styles from "./ContactForm.module.css";
   
   function ContactForm({ checkExist }) {
      const [name, setName] = useState("");
      const [number, setNumber] = useState("");
   
      const handleContactData = (e) => {
         const { name, value } = e.target;
         switch (name) {
         case "name":
            setName(value);
            break;
   
         case "number":
            setNumber(value);
            break;
   
         default:
            return;
         }
      };
   
      const handleSubmit = (e) => {
         e.preventDefault();
         checkExist({ name, number });
         setName("");
         setNumber("");
      };
   
      return (
         <form onSubmit={handleSubmit} className={styles.form}>
         <label>
            Name
            <input
               className={styles.formInput}
               value={name}
               type="text"
               name="name"
               pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
               title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
               required
               onChange={handleContactData}
            />
         </label>
   
         <label>
            Number
            <input
               className={styles.formInput}
               value={number}
               type="tel"
               name="number"
               pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
               title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
               required
               onChange={handleContactData}
            />
         </label>
   
         <button type="submit" className={styles.formBtn}>
            Add contact
         </button>
         </form>
      );
   }
   
   ContactForm.propTypes = {
      checkExist: PropTypes.func.isRequired,
   };
   
   export default ContactForm;