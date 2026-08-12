function ConfirmModal({ message, onConfirm, onCancel }) {
    return (
        <div className="confirm-modal-overlay">
            <div className="confirm-modal">
                <h2>Confirm Delete</h2>
                <p>{message}</p>

                <div className="confirm-modal-actions">
                    <button type="button" onClick={onCancel}>Cancel</button>
                    <button type="button" className="danger-button" onClick={onConfirm}>Delete</button>
                </div>

            </div>
        </div>
    );
}

export default ConfirmModal;