import React, { useState } from 'react'
import './ProofSubmissionForm.css'
import { Link , useNavigate} from 'react-router-dom'
import axios from 'axios'

function ProofSubmissionForm() {
  const [nicFile, setNicFile] = useState(null);
  const [residentialProofFile, setResidentialProofFile] = useState(null);
  const [status,setStatus] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newStatus = '4';
    setStatus(newStatus);
    console.log(newStatus);
    if (!nicFile) {
      alert("Please upload your NIC.");
      return;
    }
    
    if (!residentialProofFile) {
      alert("Please upload your residential proof.");
      return;
    }

    const formData = new FormData();
    formData.append('nic', nicFile);
    formData.append('residentialProof', residentialProofFile);
    formData.append('status', newStatus);


    try {
      const response = await axios.post('http://localhost:4433/RentIT/Controllers/userRegistrationController.php', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials:true
      });

      console.log(response.data);
      alert("Proofs submitted successfully!");
      navigate("/");

    } catch (error) {
      console.error("There was an error submitting the form!", error);
      alert("There was an error submitting the form. Please try again.");
    }
  };

  return (
    <>
      <div className="ProofSubmissionContainer">
        <div className="proofSubmissionTitle">You are a Member!</div>

        <div className="remindText">
          You're just one step away from renting with us! If you don't need it right now, you can skip this step,
          <br />
          <span>but remember, you'll need to complete it before your first payment.</span>
        </div>

        <div className="ProofSubmissionForm">
          <form onSubmit={handleSubmit}>
            <div className="submissionNIC">
              <label htmlFor="uNIC">Upload your NIC</label>
              <input 
                type="file" 
                className='submissionButton' 
                name='uNIC' 
                placeholder='Upload NIC'
                onChange={(e) => setNicFile(e.target.files[0])}
              />
              <span>(Both sides need to be there otherwise it will be rejected)</span>
            </div>

            <div className="submissionResidential">
              <label htmlFor="uResidential">Upload your Residential proof</label>
              <input 
                type="file" 
                className='submissionButton' 
                name='uResidential'
                onChange={(e) => setResidentialProofFile(e.target.files[0])}
              />
              <span>(An Electric Bill or Water Bill around 5 months old)</span>
            </div>
            <input type='text' name='status' value={status} hidden readOnly/>
            <input type="submit" name="submit" value="Submit" />

            <div className="signInQ">
              <p>If you don't need it right now? <Link to="/">Skip</Link></p>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default ProofSubmissionForm;
