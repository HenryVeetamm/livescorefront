import { Button, DatePicker, Form, Input, InputNumber, Modal, Select } from 'antd';
import { useAddPlayerMutation, useEditPlayerMutation } from 'app/services/player';
import { PlayerFormType } from 'app/services/player/types';
import { selectors as teamSelectors } from 'app/services/team';
import { positionSelectList } from 'constants/playerPosition';
import React, { ReactElement, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { UserAddOutlined } from '@ant-design/icons';
import { showSuccess } from 'utils/messages';
import MobileDatePicker from 'components/Mobile/MobileDatePicker';
import useScreenBreakpoint from 'hooks/useScreenBreakpoint';
import { formats } from 'utils/date';

type PlayerFormProps = {
  button? : ReactElement | undefined
  initialValues? : PlayerFormType
}

const PlayerForm = ({ button, initialValues } : PlayerFormProps) => {
  const { isMobile } = useScreenBreakpoint();

  const [ isOpen, setIsOpen ] = useState(false);
  const [ form ] = Form.useForm();

  const [ addPlayer, addMeta ] = useAddPlayerMutation();
  const [ editPlayer, editMeta ] = useEditPlayerMutation();

  const teamId = useSelector(teamSelectors.getTeamId);

  useEffect(() => {
    if(addMeta.isSuccess || editMeta.isSuccess) setIsOpen(false);
  }, [ addMeta.isSuccess, editMeta.isSuccess ]);

  const onSubmit = () => {
    form.validateFields().then(async values => {
      if (initialValues) {
        await editPlayer({ ...values, id: initialValues.id, teamId });
      }
      else await addPlayer({ teamId, ...values });
      form.resetFields();
    }).then(() => {
      showSuccess('Salvestatud');
    }).catch();
  };

  const getButton = () => {
    if (button) return React.cloneElement(button, { onClick: () => setIsOpen(true) });

    return <Button
      title='Lisa mängija'

      icon={<UserAddOutlined />}
      onClick={() => setIsOpen(true)}
      type={'link'}

    >Lisa mängija</Button>
    ;
  };

  const getDateField = () => {
    return <Form.Item
      label="Sünnipäev"
      name="dateOfBirth"
      rules={[ { required: true, message: 'Väli on kohustuslik' } ]}
    >
      {isMobile? <MobileDatePicker precision='day' format={formats.DD_MM_YYYY}/> :<DatePicker style={{ width: '100%' }}
        format={'DD.MM.YYYY'}/>}
    </Form.Item>;
  };

  return <>
    {getButton()}
    <Modal
      open={isOpen}
      okText='Salvesta'
      cancelText='Loobu'
      onCancel={() => {
        form.resetFields();
        setIsOpen(false);
      }}
      onOk={onSubmit}
      confirmLoading={addMeta.isLoading || editMeta.isLoading}
      cancelButtonProps={{ disabled: addMeta.isLoading || editMeta.isLoading }}
    >
      <Form
        layout='vertical'
        form={form}
        initialValues={initialValues}
      >
        <Form.Item
          label="Mängija eesnimi"
          name="firstName"
          rules={[ { required: true, message: 'Väli on kohustuslik' } ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Mängija perekonnanimi"
          name="lastName"
          rules={[ { required: true, message: 'Väli on kohustuslik' } ]}
        >
          <Input/>
        </Form.Item>
        <Form.Item
          label="Mängija positsioon"
          name="position"
          rules={[ { required: true, message: 'Väli on kohustuslik' } ]}
        >
          <Select options={positionSelectList}/>
        </Form.Item>
        {getDateField()}
        <Form.Item
          label="Särginumber"
          name="shirtNumber"
          rules={[ { required: true, message: 'Väli on kohustuslik' } ]}
        >
          <InputNumber style={{ width: '100%' }}/>
        </Form.Item>
      </Form>
    </Modal>
  </>;
};

export default PlayerForm;