import { 
    Modal,
    Input,
    Button
} from 'antd';

const ActionModal = ({ mode, taskName, taskPrecentage, setTask, setPrecentage, submitTask, setModalToggle, modalToggle }) => {

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
                <Button key="submit" id="submit_action_modal" onClick={submitTask}>
                    Save Task
                </Button>
                ]}
        >
            <div className="my-2">
                <label>Task Name :</label>
                <Input placeholder="Task Name" name="task_name" value={taskName} onChange={(e) => setTask(e.target.value)} />
            </div>
            <div className="my-2">
                <label>Progress :</label>
                <Input placeholder="Task Precentage" id="task_precentage" value={taskPrecentage} onChange={(e) => setPrecentage(e.target.value.replace(/\D/,''))} />
            </div>
        </Modal>
    )
}

export default ActionModal;