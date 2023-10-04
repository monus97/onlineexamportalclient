import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getResult } from '../redux/actions/authActions';

function CheckResult() {
    const [value, setValue] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
      if (value === true) {
        dispatch(getResult());
        navigate("/showresult");
      }
    }, [value]);

  return (
    <div>
      <div className="home_page">
        <Button onClick={() => setValue(true)}>
          for check your result click me
        </Button>
      </div>
    </div>
  );
}

export default CheckResult;
