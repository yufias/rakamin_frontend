import { Modal, Input, Button } from "antd";

const NewGroupModal = ({ groupTitle, groupDescription, setGroupTitle, setGroupDescription, setModalGroupToggle, submitNewGroup, modalGroupToggle }) => {
    return (
        <Modal
            title="Create New Group"
            centered
            open={modalGroupToggle}
            onCancel={() => setModalGroupToggle(false)}
            footer={[
                <Button key="back" onClick={() => setModalGroupToggle(false)}>
                    Cancel
                </Button>,
                <Button key="submit" onClick={submitNewGroup}>
                    Save Group
                </Button>
                ]}
        >
            <div className="my-2">
                <label>Group Title :</label>
                <Input placeholder="Group Title" value={groupTitle} onChange={(e) => setGroupTitle(e.target.value)} />
            </div>
            <div className="my-2">
                <label>Description :</label>
                <Input placeholder="Group Description" value={groupDescription} onChange={(e) => setGroupDescription(e.target.value)} />
            </div>
        </Modal>
    )
}

export default NewGroupModal;