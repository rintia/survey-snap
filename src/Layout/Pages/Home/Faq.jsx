import React from 'react';

const Faq = () => {
    return (
        <div className='mt-32 px-4 lg:px-0'>
            <h1 className='text-center mb-12 text-6xl text-[#61B15A]'>Frequantly Asked Quastions</h1>
            <div className='flex flex-col lg:flex-row-reverse justify-evenly items-center '>
            <img className='w-[500px]' src="https://i.ibb.co/zVH5f4s/faq.png" alt="" />
            <div className="join join-vertical space-y-6 w-full">
  <div className="collapse collapse-arrow join-item border border-base-300">
    <input type="radio" name="my-accordion-4" checked="checked" /> 
    <div className="collapse-title text-xl font-medium text-[#61B15A]">
    How do I get started?
    </div>
    <div className="collapse-content"> 
      <p>Sign up, complete your profile, and start receiving survey invitations.</p>
    </div>
  </div>
  <div className="collapse collapse-arrow join-item border border-base-300">
    <input type="radio" name="my-accordion-4" /> 
    <div className="collapse-title text-xl font-medium text-[#61B15A]">
    How often will I get surveys?
    </div>
    <div className="collapse-content"> 
      <p>Frequency varies, but we aim for regular opportunities based on your profile. Check your email and keep your profile updated.</p>
    </div>
  </div>
  <div className="collapse collapse-arrow join-item border border-base-300">
    <input type="radio" name="my-accordion-4" /> 
    <div className="collapse-title text-xl font-medium text-[#61B15A]">
    What rewards can I earn?
    </div>
    <div className="collapse-content"> 
      <p>Cash, gift cards, and more. Rewards vary by survey. Check before participating.</p>
    </div>
  </div>
  <div className="collapse collapse-arrow join-item border border-base-300">
    <input type="radio" name="my-accordion-4" /> 
    <div className="collapse-title text-xl font-medium text-[#61B15A]">
    When do I get rewards after a survey?
    </div>
    <div className="collapse-content"> 
      <p>Usually within a few business days. High-value rewards may take longer. Thanks for your patience.</p>
    </div>
  </div>
  <div className="collapse collapse-arrow join-item border border-base-300">
    <input type="radio" name="my-accordion-4" /> 
    <div className="collapse-title text-xl font-medium text-[#61B15A]">
    Is my info secure?
    </div>
    <div className="collapse-content"> 
      <p>Yes. We prioritize privacy. Your details are only used for survey matching and are never shared without your consent. Review our privacy policy on our website for more details.</p>
    </div>
  </div>
</div>
            
        </div>
        </div>
    );
};

export default Faq;