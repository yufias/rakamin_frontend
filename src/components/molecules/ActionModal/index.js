import { 
    Modal,
    Input,
    Button
} from 'antd';
import { useState } from 'react';

const ActionModal = ({ mode, todoId, taskName, taskPrecentage, setTask, setPrecentage, submitTask, setModalToggle, modalToggle }) => {

    return (
        <Modal
            title={mode == 'edit' ? 'Edit Task' : 'Create Task'}
            centered
            open={modalToggle}
            onCancel={() => setModalToggle(false)}
            footer={[
                <Button key="back" onClick={() => setModalToggle(false)}>
                    Cancel
                </Button>,
                <Button key="submit" onClick={submitTask}>
                    Save Task
                </Button>
                ]}
        >
            <div className="my-2">
                <label>Task Name :</label>
                <Input placeholder="Task Name" value={taskName} onChange={(e) => setTask(e.target.value)} />
            </div>
            <div className="my-2">
                <label>Progress :</label>
                <Input placeholder="Task Name" value={taskPrecentage} onChange={(e) => setPrecentage(e.target.value)} />
            </div>
        </Modal>
    )
}

export default ActionModal;