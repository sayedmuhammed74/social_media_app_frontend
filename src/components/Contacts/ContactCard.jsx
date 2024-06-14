// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';

const ContactCard = ({ contact }) => {
  const fullname =
    contact?.from.firstname ===
      JSON.parse(localStorage.getItem('user'))?.firstname &&
    contact?.from.lastname ===
      JSON.parse(localStorage.getItem('user'))?.lastname
      ? contact?.to.firstname + ' ' + contact?.to.lastname
      : contact?.from.firstname + ' ' + contact?.from.lastname;
  return (
    <div className="flex justify-between items-center px-3 py-2">
      <div className="flex items-center gap-2">
        <img
          src="./imgs/man.jpg"
          className="rounded-md"
          alt=""
          width={30}
          height={30}
        />
        <span className="text-sm text-slate-800">{fullname}</span>
      </div>
      <FontAwesomeIcon icon={faEllipsis} className="cursor-pointer" />
    </div>
  );
};

export default ContactCard;
