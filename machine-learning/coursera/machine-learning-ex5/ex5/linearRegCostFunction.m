function [J, grad] = linearRegCostFunction(X, y, theta, lambda)
%LINEARREGCOSTFUNCTION Compute cost and gradient for regularized linear 
%regression with multiple variables
%   [J, grad] = LINEARREGCOSTFUNCTION(X, y, theta, lambda) computes the 
%   cost of using theta as the parameter for linear regression to fit the 
%   data points in X and y. Returns the cost in J and the gradient in grad

% Initialize some useful values
m = length(y); % number of training examples

% You need to return the following variables correctly 
J = 0;
grad = zeros(size(theta));

% ====================== YOUR CODE HERE ======================
% Instructions: Compute the cost and gradient of regularized linear 
%               regression for a particular choice of theta.
%
%               You should set J to the cost and grad to the gradient.
%

h = X*theta;
errors_vector = h - y;
A = sum((errors_vector).^2);

t = transpose(theta);
partialTheta = t(2:end);
sqPartialTheta = transpose(partialTheta.^2);

R = (lambda/(2*m))*(sum(sqPartialTheta));

J = (1/(2*m))*A + R;

transposed_X = X';

z = zeros(1:size(theta)(2));
w = theta(2:end, :);
tt = [z; w];

grad = (1/m)*(transposed_X*errors_vector) + (lambda/m)*tt;

% =========================================================================

grad = grad(:);

end
