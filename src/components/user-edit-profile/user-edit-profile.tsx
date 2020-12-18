import React, { FC, ReactElement, useCallback, useState } from 'react';
import { css } from '@emotion/css';
import { Form, Field, FieldRenderProps } from 'react-final-form';
import { connect, useSelector } from 'react-redux';
import { Button, makeStyles, ButtonGroup } from '@material-ui/core';

import { userEditSelector } from '../../selectors';
import { StyledInput } from '../../shared/styled-input/styled-input';
import { StyledSelect } from '../../shared/styled-select/styled-select';
import { updateUserDataAction } from '../../actions/sync';
import { UserEditModel } from '../../models';

const countries = [
  {
    label: 'Australia',
    value: 'Australia',
  },
  {
    label: 'Switzerland',
    value: 'Switzerland',
  },
  {
    label: 'Denmark',
    value: 'Denmark ',
  },
  {
    label: 'Spain',
    value: 'Spain ',
  },
];

type UserEditProfileCompPropTypes = {
  updateUserData(data: UserEditModel): void;
};

export const UserEditProfileComp: FC<UserEditProfileCompPropTypes> = ({ updateUserData }) => {
  const [emailFieldsCount, setEmailFieldsCount] = useState<number>(1);
  const [phoneFieldsCount, setPhoneFieldsCount] = useState<number>(1);

  const buttonsGroupClasses = useButtonsGroupStyles();

  const userEditData = useSelector(userEditSelector);

  const renderFieldItem = useCallback(
    ({ input, label, select = false, index }) =>
      !select ? (
        <StyledInput {...input} label={label} key={index} />
      ) : (
        <StyledSelect {...input} label={label} items={countries} />
      ),
    []
  );

  const addRemoveFields = useCallback(
    (type: string, count: number) => () => {
      (type === 'email' ? setEmailFieldsCount : setPhoneFieldsCount)(count);
    },
    []
  );

  const getNewInput = useCallback((input, i): FieldRenderProps<string> => {
    const inputChangeHandler = input.onChange;

    return {
      ...input,
      onChange: (e) => {
        const newData = [...input.value];
        newData.splice(i - 1, 1, e.target.value);
        inputChangeHandler(newData);
      },
      value: input.value[i - 1] || '',
    };
  }, []);

  const getFieldsByCount = useCallback(
    (count: number, label: string) => ({
      input,
    }: FieldRenderProps<Array<string>>): ReactElement[] => {
      const fieldsArr: ReactElement[] = [];

      for (let i = 1; i <= count; i++) {
        const newInput = getNewInput(input, i);
        fieldsArr.push(renderFieldItem({ input: newInput, label, index: i }));
      }

      return fieldsArr;
    },
    [renderFieldItem, getNewInput]
  );

  const submitHandler = useCallback(
    (data: UserEditModel) => {
      updateUserData(data);
    },
    [updateUserData]
  );

  return (
    <div className={userInfoContainerStyles}>
      <div className={userInfoWrapperStyles}>
        <h3>Edit Profile</h3>
        <Form
          initialValues={userEditData}
          onSubmit={submitHandler}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <div className={fieldsWrapperStyles}>
                <Field name="firstName" label="First name" render={renderFieldItem} />
                <Field name="lastName" label="Last name" render={renderFieldItem} />
              </div>
              <div className={fieldsWrapperStyles}>
                <Field name="address" label="Address" render={renderFieldItem} />
              </div>
              <div className={fieldsWrapperStyles}>
                <Field
                  someArbitraryOtherProp={42}
                  name="city"
                  label="City"
                  render={renderFieldItem}
                />
                <Field name="postcode" label="Postal Code" render={renderFieldItem} />
                <Field select name="country" label="Country" render={renderFieldItem} />
              </div>
              <div className={emailAndPhoneContainerStyles}>
                <div>
                  <ButtonGroup variant="contained" classes={buttonsGroupClasses} fullWidth>
                    <Button
                      color="primary"
                      disabled={emailFieldsCount === 5}
                      onClick={addRemoveFields('email', emailFieldsCount + 1)}
                    >
                      Add
                    </Button>
                    <Button
                      color="secondary"
                      disabled={emailFieldsCount === 1}
                      onClick={addRemoveFields('email', emailFieldsCount - 1)}
                    >
                      Remove
                    </Button>
                  </ButtonGroup>
                  <div className={emailAndPhoneFieldsWrapperStyles}>
                    <Field name="emails" render={getFieldsByCount(emailFieldsCount, 'Email')} />
                  </div>
                </div>
                <div>
                  <ButtonGroup variant="contained" classes={buttonsGroupClasses} fullWidth>
                    <Button
                      color="primary"
                      disabled={phoneFieldsCount === 5}
                      onClick={addRemoveFields('phone', phoneFieldsCount + 1)}
                    >
                      Add
                    </Button>
                    <Button
                      color="secondary"
                      disabled={phoneFieldsCount === 1}
                      onClick={addRemoveFields('phone', phoneFieldsCount - 1)}
                    >
                      Remove
                    </Button>
                  </ButtonGroup>
                  <div className={emailAndPhoneFieldsWrapperStyles}>
                    <Field name="phones" render={getFieldsByCount(phoneFieldsCount, 'Phone')} />
                  </div>
                </div>
              </div>
              <Button variant="contained" color="primary" type="submit">
                Update profile
              </Button>
            </form>
          )}
        />
      </div>
    </div>
  );
};

const mapDispatch = (dispatch) => ({
  updateUserData: (data: UserEditModel) => dispatch(updateUserDataAction(data)),
});

export const UserEditProfile = connect(null, mapDispatch)(UserEditProfileComp);

const useButtonsGroupStyles = makeStyles({
  root: {
    marginBottom: 10,
  },
});

const userInfoContainerStyles = css`
  width: calc(100% - 300px);
  > div > h3 {
    font-family: Roboto;
    margin-bottom: 10px;
  }
`;

const userInfoWrapperStyles = css`
  height: 100%;
  padding: 15px 10px;
  border: 2px solid #dfdbdb;
  border-radius: 3px;
`;

const fieldsWrapperStyles = css`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const emailAndPhoneContainerStyles = css`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  > div {
    width: 100%;
    margin: 0 10px;
    &:first-child {
      margin-left: 0;
    }
    &:last-child {
      margin-right: 0;
    }
  }
`;

const emailAndPhoneFieldsWrapperStyles = css`
  display: flex;
  flex-direction: column;
  > div {
    margin: 0 0 10px;
  }
`;
