function g = sigmoid(z)
%SIGMOID Compute sigmoid function
%   g = SIGMOID(z) computes the sigmoid of z.

% You need to return the following variables correctly 
g = zeros(size(z));

% ====================== YOUR CODE HERE ======================
% Instructions: Compute the sigmoid of each value of z (z can be a matrix,
%               vector or scalar).

function h = term (x)
    h = 1/(1 + exp(-x))
endfunction

function h2 = vectorTerm(x)
    h2 = 1 ./ (1 .+ exp(-z))
endfunction

    if isscalar(z) == 1
        g = term(z)
    else
        g = 1 ./ (1 .+ exp(-z))
end



% =============================================================

end
