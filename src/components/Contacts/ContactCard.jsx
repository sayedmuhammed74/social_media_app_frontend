// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';

const ContactCard = ({ contact }) => {
  return (
    <div className="flex justify-between items-center px-3 py-2">
      <div className="flex items-center gap-2">
        <div className="relative">
          <img
            src={contact?.picture}
            className="w-10 h-10 rounded-full"
            alt={contact?.firstname}
          />
          <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-green-500"></span>
        </div>
        <span className="text-sm text-slate-800">
          {contact?.firstname} {contact?.lastname}
        </span>
      </div>
      <FontAwesomeIcon icon={faEllipsis} className="cursor-pointer" />
    </div>
  );
};

export default ContactCard;
