import React from 'react';
import FormInput from './FormInput';

function ItemForm({ handleChange, handleSubmit }){
  return(
    <form onSubmit={handleSubmit}>
      <FormInput name="name" type="text" handleChange={handleChange} />
      <FormInput name="image" type="text" handleChange={handleChange} />
      <FormInput name="color" type="text" handleChange={handleChange} />
      <FormInput name="originallyFrom" type="text" handleChange={handleChange} />
      <FormInput name="description" type="text" handleChange={handleChange} />
      <FormInput name="retailPrice" type="number" handleChange={handleChange} />
      <FormInput name="newPrice" type="number" handleChange={handleChange} />
      <button className="button is-rounded is-outlined"> Create/ Edit </button>
    </form>
  );
}
export default ItemForm;


// <form onSubmit={handleSubmit}>
// <div className="field">
// <label className="label"> Name: </label>
// <input className="input is-size-5" name="name" type="text" onChange={handleChange}/>
// </div>
// <div className="field">
// <label className="label"> Image: </label>
// <input className="input is-size-5" name="image" type="text" onChange={handleChange}/>
// </div>
// <button className="button is-rounded is-outlined"> Create </button>
// </form>

//NEED TO ADD LAT AND LNG AND TYPE -ARRAYS!! AND SMALL smallImages
