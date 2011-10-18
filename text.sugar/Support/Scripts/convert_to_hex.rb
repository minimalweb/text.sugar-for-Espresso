#!/usr/bin/env ruby -wKU
begin
print STDIN.read.unpack("U*").map { |e| sprintf('0x%02x', e) }.join(' ')
rescue
end