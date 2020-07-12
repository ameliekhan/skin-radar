import React from 'react';

class SkinForm extends React.Component {

  render() {
    return (
    
        <div className="row">
                <form className="col s12" onSubmit={this.props.handleSubmit}>
                  <div className="row">
                    <div className="input-field col s12">
                      <textarea id="ingredientInput" className="materialize-textarea " name="ingredient" value={this.props.value} onChange={this.props.handleChange}  ></textarea>
                      <label htmlFor="ingredientInput">Enter Skin Care Ingredients</label>

                      <button className="btn waves-effect orange" type="submit" name="action">Analyze
                      <i className="material-icons right"></i>
                      </button>
                    
                    </div>
                  </div>
                     
                </form>
              </div>
    
     
    );
  }
}
export default SkinForm