import "./comp-styles/Confirmation.css";

type ConfirmationProps = {
  joined: boolean;
  courseTitle: string;
  onClose: () => void;
};

function Confirmation({ joined, courseTitle, onClose }: ConfirmationProps) {
  let action = "left";
  if (joined) {
    action = "joined";
  }

  return (
    <div className="popup-overlay">
      <div className="popup-box" role="dialog">
        <p className="popup-message">
          You have successfully {action} {courseTitle}.
        </p>
        <button className="popup-close-button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}

export default Confirmation;