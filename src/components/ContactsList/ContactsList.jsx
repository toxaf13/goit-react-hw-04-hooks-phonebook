const ContactListItem=({id, name, phone, onRemove}) => {
   return (
      <li>
         {name} : { phone} <button onClick={()=> onRemove(id)}>delete</button>
      </li>
   )
}
export const ContactsList = ({ contacts, onRemove }) =>{
   if(contacts.length === 0 )return null
   return(
      <ul>
         {contacts.map(contact => <ContactListItem {...contact} onRemove={onRemove}/>)}
      </ul>
   )
}