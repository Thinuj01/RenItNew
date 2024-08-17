import React from 'react'
import './ProofSubmissionForm.css'
import { Link } from 'react-router-dom'

function ProofSubmissionForm() {
  return (
    <>
        <div className="ProofSubmissionContainer">
            <div className="proofSubmissionTitle">You are a Member!</div>

            <div className="remindText">
                You're just one step away from renting with us! If you don't need it right now, you can skip this step,
                <br/>
                <span>but remember, you'll need to complete it before your first payment.</span>
            </div>

            <div className="ProofSubmissionForm">
                <form action="">
                    <div className="submissionNIC">
                        <label htmlFor="uNIC">Upload your NIC</label>
                        <input type="file" className='submissionButton' name='uNIC' placeholder='Upload NIC'/>
                        <span>(Both sides need to be there otherwise it will rejected)</span>
                    </div>

                    <div className="submissionResidential">
                        <label htmlFor="uResidential">Upload your Residential proof</label>
                        <input type="file" className='submissionButton' name='uResidential'/>
                        <span>(A Electric Bill or Water Bill around 5 months old )</span>
                    </div>
                    
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

export default ProofSubmissionForm
