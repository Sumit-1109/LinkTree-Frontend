import "./Toast.css";
import { useEffect, useState } from "react";
import { CheckCircle, AlertTriangle, X } from "lucide-react";
import PropTypes from "prop-types";

const Toast = ({ message, type, onClose }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  if (!visible) return null;

  return (
    <div className={`toast ${type}`}>
      {type === "success" ? (
        <CheckCircle className="toast-icon" />
      ) : (
        <AlertTriangle className="toast-icon" />
      )}
      <span className="toast-message">{message}</span>
      <button className="toast-close" onClick={() => setVisible(false)}>
        <X size={16} />
      </button>
    </div>
  );
};

Toast.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["success", "error"]).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Toast;