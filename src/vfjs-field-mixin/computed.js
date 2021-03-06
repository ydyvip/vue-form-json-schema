import { merge } from 'lodash';

const computed = {
  vfjsComputedFieldHasErrors() {
    const { vfjsFieldErrors } = this.vfjsFieldState;

    return vfjsFieldErrors && vfjsFieldErrors.length > 0;
  },
  vfjsComputedShowFieldErrors() {
    const { vfjsFieldDirty, vfjsFieldBlur } = this.vfjsFieldState;
    const { showValidationErrors } = this.vfjsOptions;

    return (vfjsFieldDirty && vfjsFieldBlur) || showValidationErrors;
  },
  vfjsComputedFieldErrorOptions() {
    if (this.vfjsComputedShowFieldErrors && this.vfjsComputedFieldHasErrors) {
      return this.vfjsFieldErrorOptions;
    }

    return {};
  },
  vfjsComputedFieldAttrs() {
    const required = this.vfjsFieldHelperAttrsRequired();
    const value = this.vfjsFieldHelperAttrsValue();
    const checked = this.vfjsFieldHelperAttrsChecked();

    const attrs = {
      // id: this.vfjsFieldId, // This is very useful when debugging to see when nodes are updated
      required,
      value,
      checked,
    };

    return attrs;
  },
  vfjsComputedFieldDomProps() {
    const innerHTML = this.vfjsFieldHelperDomPropsInnerHTML();
    const value = this.vfjsFieldHelperDomPropsValue();
    const checked = this.vfjsFieldHelperDomPropsChecked();

    const domProps = {
      innerHTML,
      value,
      checked,
    };

    return domProps;
  },
  vfjsComputedFieldProps() {
    const required = this.vfjsFieldHelperPropsRequired();

    const props = {
      required,
    };

    return props;
  },
  vfjsComputedFieldOptions() {
    return {
      attrs: this.vfjsComputedFieldAttrs,
      domProps: this.vfjsComputedFieldDomProps,
      key: this.vfjsFieldOptions.key || this.vfjsFieldId,
      props: this.vfjsComputedFieldProps,
    };
  },
  vfjsComputedMergedFieldOptions() {
    return merge(
      {},
      this.vfjsDefaultOptions,
      this.vfjsComputedFieldErrorOptions,
      this.vfjsComputedFieldOptions,
    );
  },
};

export default computed;
