// Activation functions
export const sigmoid = (x) => 1 / (1 + Math.exp(-x));
export const relu = (x) => Math.max(0, x);
export const tanh_fn = (x) => Math.tanh(x);

// Forward pass for single neuron
export const forwardPass = (inputs, weights, bias, activationFn) => {
  const weightedSum = inputs.reduce((sum, input, i) => sum + input * weights[i], 0) + bias;
  const activation = activationFn === 'sigmoid' ? sigmoid : activationFn === 'relu' ? relu : tanh_fn;
  return {
    weightedSum,
    output: activation(weightedSum),
    activationName: activationFn,
  };
};
