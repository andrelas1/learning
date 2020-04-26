function [J, grad] = costFunctionReg(theta, X, y, lambda)
%COSTFUNCTIONREG Compute cost and gradient for logistic regression with regularization
%   J = COSTFUNCTIONREG(theta, X, y, lambda) computes the cost of using
%   theta as the parameter for regularized logistic regression and the
%   gradient of the cost w.r.t. to the parameters. 

% Initialize some useful values
m = length(y); % number of training examples

% You need to return the following variables correctly 
J = 0;
grad = zeros(size(theta));

% ====================== YOUR CODE HERE ======================
% Instructions: Compute the cost of a particular choice of theta.
%               You should set J to the cost.
%               Compute the partial derivatives and set grad to the partial
%               derivatives of the cost w.r.t. each parameter in theta

thetaTX = X*theta;

g = 1 ./ (1 .+ exp(-thetaTX));

h = g;

B = (-1*y).*(log(h));
C = (1 - y).*log(1 - h);
delta = sum(B - C);

t = transpose(theta);
partialTheta = t(2:end);
sqPartialTheta = transpose(partialTheta.^2);

R = (lambda/(2*m))*(sum(sqPartialTheta));
J = (1/m)*delta + R;

D = sum((h - y).*X);
Rgrad = (lambda/m) * partialTheta;
grad = (1/m)*D + [0 Rgrad];





% =============================================================

end
