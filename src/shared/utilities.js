export const updateObject = (oldState, newProperties) => {
	return { ...oldState, ...newProperties };
};

export const validationHandler = (value, constraints) => {
	if (constraints.required) {
		if (value.trim() == "") {
			return { result: false, message: `Field can't be empty!` };
		}
	}
	if (constraints.requiredNoTrim) {
		if (value == "") {
			return { result: false, message: "Field can't be empty!" };
		}
	}
	if (constraints.min) {
		if (value.trim().length < constraints.min) {
			return {
				result: false,
				message: `There must be atleast ${constraints.min} characters.`
			};
		}
	}
	if (constraints.max) {
		if (value.trim().length > constraints.max) {
			return {
				result: false,
				message: `Can't use more than ${constraints.max} characters.`
			};
		}
	}
	if (constraints.minNoTrim) {
		if (value.length < constraints.minNoTrim) {
			return {
				result: false,
				message: `There must be atleast ${constraints.minNoTrim} characters.`
			};
		}
	}
	if (constraints.maxNoTrim) {
		if (value.length > constraints.maxNoTrim) {
			return {
				result: false,
				message: `Can't use more than ${constraints.maxNoTrim} characters.`
			};
		}
	}
	if (constraints.in) {
		if (!constraints.in.includes(value)) {
			return {
				result: false,
				message: `We are not supporting ${value} currently.`
			};
		}
	}
	if (constraints.format) {
		let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
		if (!reg.test(value)) {
			return {
				result: false,
				message: `That doesn't seems like an email.`
			};
		}
	}
	return {
		result: true
	};
};
